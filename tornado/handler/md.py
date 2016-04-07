import os
import tornado
import datetime
import util.emailutil
import logging

from handler.base import BaseHandler
from urllib.parse import unquote
from setting import settings

class MdHandler(BaseHandler):
    def get_(self):
        method = self.get_argument('m','view')
        getattr(self,'get_' + method)() 

    @tornado.web.authenticated
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
        markdown = 'TODO'
        username = ''
        cur = self.db.cursor()
        news = cur.execute("""
            select w.id,w.title,u.realname,w.markdown  
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

            cur.execute("update piki_wiki set pv = pv+1 where id =:id",{'id':wiki[0]}) 
            self.db.commit()
            cur.close()

            username = wiki[3]
            markdown = wiki[2]


        self.render("wiki/md/view.html",
            doc=markdown,path=path,
            username=username,news=news,
            subscriptions=subscriptions,hots=hots)

    def get_edit(self):
        path = self.__get_path()
        doc = "TODO"
        wiki = self.__get_wiki(path)
        if wiki is not None:
            logging.info(wiki)
            doc = wiki[2]

        self.render("wiki/md/edit.html",doc=doc,path=path)

    def get_subscribe(self):
        path = self.__get_path()
        wiki = self.__get_wiki(path)
        cur = self.db.cursor()
        subscriptions = cur.execute("select id from piki_subscription where wid=? and uid = ?",
            (wiki[0], self.current_user[0],)).fetchall()
        if len(subscriptions) > 0:
            self.write("1")
        else:
            cur.execute("insert into piki_subscription (wid,uid) values (?,?)",(wiki[0],self.current_user[0],))
            self.db.commit()
            to = [wiki[6]]
            subject = 'wiki订阅通知'
            content = """
                Hi %s,<br>
                您创建的条目<a href='http://wiki.moseeker.com/%s'>%s</a>,被%s订阅了!!!
            """ % (wiki[3],path,path,self.current_user[1])
            util.emailutil.send(to,subject,content)
            self.write("2")
        cur.close()
                
    def post_edit(self):
        path = self.__get_path()
        wiki = self.__get_wiki(path)
        doc = self.get_argument('doc')

        if wiki is not None:
            self.__update_markdown(wiki,doc)

            cur = self.db.cursor()
            subscriptions = cur.execute("select u.email from piki_subscription s join piki_user u on s.uid = u.id where wid=?",
                (wiki[0],)).fetchall()
            print("sub:",subscriptions)
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
        sql ="insert into piki_wiki (title,creator,pv,create_time,markdown) values ('%s',%s,0,datetime(),'%s')" % (title,self.current_user[0],doc)
        print("sql:",sql)
        cursor.execute(sql)
        self.db.commit()
        cursor.close()

    def __get_path(self):
        url = self.request.uri
        path = url[url.rfind('/') + 1 : url.find('?m=')]
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

