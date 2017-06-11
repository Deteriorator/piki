import os
import os.path
import tornado
import datetime

from handler.base import BaseHandler
from urllib.parse import unquote
from setting import tornado_settings

class GtHandler(BaseHandler):
    def get_(self):
        method = self.get_argument('m','view')
        getattr(self,'get_' + method)() 

    def post_(self):
        method = self.get_argument('m','view')
        getattr(self,'post_' + method)() 

    def get_view(self):
        url = self.request.uri
        if url == '/':
            url = '/index.md'
        path = url.split('/')[-1]
        path = unquote(path)
        wiki = self.__get_wiki(path)
        doc_path = settings['doc_path'] + path
        
        cur = self.db.cursor()
        news = cur.execute("""
            select w.id,w.title,u.realname  
            from piki_wiki w
            join piki_user u on w.creator = u.id
            order by datetime(w.create_time) desc
            limit 10

            """).fetchall()
        hots = cur.execute("""
            select w.id,w.title,w.pv  
            from piki_wiki w
            join piki_user u on w.creator = u.id
            order by w.pv desc
            limit 10
            """).fetchall()

        subscriptions = []
        if wiki is not None:
            subscriptions = cur.execute("""
                select u.realname
                from piki_subscription s
                join piki_user u on u.id = s.uid
                where wid = ?
                """,(wiki[0],)).fetchall()

        if os.path.exists(doc_path):
            if wiki is not None:
                cur.execute("update piki_wiki set pv = pv+1 where id =:id",{'id':wiki[0]}) 
                self.db.commit()
                cur.close()
            doc_file = open(doc_path,'r')
            markdown = doc_file.read()
            self.render("wiki/md/view.html",
                doc=markdown,path=path,
                wiki=wiki,news=news,
                subscriptions=subscriptions,hots=hots)
            doc_file.close()
        else:
            doc_file = open(doc_path,'w')
            doc_file.write('TODO')
            doc_file.close()
            self.redirect('/%s?m=edit' % path)

    def get(self):
        path = self.__get_path()
        doc = ""
        if path != "":
            if os.path.isfile(settings['doc_path'] + path):
                doc_file = open(settings['doc_path'] + path,'r')
                doc = doc_file.read()
                doc_file.close()
            self.render("wiki/gt/edit.html",doc=doc,path=path)
        else:
            self.render("index.md")
                
    def post(self):
        path = self.__get_path()
        wiki = self.__get_wiki(path)
        doc = self.get_argument('doc')
        print('wiki',wiki)
        print('doc',doc)
        if wiki is not None:
            #self.__update_markdown(wiki,doc)

            cur = self.db.cursor()
            subscriptions = cur.execute("select u.email from piki_subscription s join piki_user u on s.uid = u.id where wid=?",
                (wiki[0],)).fetchall()
            if len(subscriptions) > 0:
                to = []
                for sub in subscriptions:
                    to.append(sub[0])
                subject = "wiki条目更新通知"
                content = """
                    Hi All,<br>
                    %s更新了wiki条目<a href='http://wiki.moseeker.com/%s'>%s</a>!
                    """ % (self.current_user[1],path,path)
                util.emailutil.send(to,subject,content)
                cur.close()
        else:
            self.__add_wiki(path,doc)

        self.write_file(path,doc)
        self.write('1')

    def __add_wiki(self,title,doc):
        cursor = self.db.cursor()
        print(self.current_user[0])
        wiki = [(title,doc,self.current_user[0]),]
        sql ="insert into piki_wiki (title,creator,pv,create_time) values ('%s',%s,0,datetime())" % (title,self.current_user[0])
        print("sql:",sql)
        cursor.execute(sql)
        self.db.commit()
        cursor.close()

    def __get_path(self):
        url = self.request.uri
        path = url[url.rfind('/') + 1 : url.find('.gt') + 3]
        path = unquote(path)
        if path == '':
            path = 'index.md'
        return path

    def __get_wiki(self,path):
        sql = """
        SELECT w.id,
               w.title,
               w.markdown,
               u.realname,
               w.pv,
               w.create_time,
               u.email
        FROM piki_wiki w
        JOIN piki_user u ON w.creator = u.id
        WHERE title=:title
        """
        cursor = self.db.cursor()
        cursor.execute(sql,{'title':path})
        wiki = cursor.fetchone()
        cursor.close()
        return wiki

    def __update_markdown(self,wiki,doc):
        cursor = self.db.cursor()
        cursor.execute("update piki_wiki set markdown=:markdown where id=:id",{'markdown':doc,'id':int(wiki[0])})

