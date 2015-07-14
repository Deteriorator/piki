#!/usr/bin/env python3
import os
import tornado.httpserver
import tornado.ioloop
import tornado.web
import shutil

from tornado.options import options
from setting import settings
import time
from urllib.parse import unquote

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        user = {}
        user_id = self.get_secure_cookie('wiki_user')
        if not user_id:
            return user
        db_file = open(settings['user_db'],'r')
        db = db_file.read()
        db_file.close()
        for line in db:
            line = line.split('\t')
            if line[0] == user_id:
                user['username'] = line[1]
                user['password'] = line[2]
                user['email'] = line[3]
        return user
class EditHandler(BaseHandler):
    #@tornado.web.authenticated
    def get(self):
        path = self.get_argument("path","")
        print('path',path)
        doc = ""
        if path != "":
            doc_file = open(settings['doc_path'] + path,'r')
            doc = doc_file.read()
            doc_file.close()
        self.render("editor.html",doc=doc,path=path)

    def post(self):
        md = self.get_argument('md')
        doc = self.get_argument('doc')
        path = settings['doc_path'] + md
        if os.path.exists(path):
            shutil.move(path,path+time.strftime("%Y%m%d%H%M"))
        doc_file = open(settings['doc_path'] + md,'w')
        doc_file.write(doc)
        doc_file.close()
        self.write('1')

class PreviewHandler(BaseHandler):
    def get(self):
        url = self.request.uri
        if url == '/':
            url = '/index.md'
        path = url.split('/')[-1]
        path = unquote(path)
        doc_path = settings['doc_path'] + path
        if os.path.exists(doc_path):
            doc_file = open(doc_path,'r')
            markdown = doc_file.read()
            doc_file.close()
            self.render("index.html",doc=markdown,path=path)
        else:
            doc_file = open(doc_path,'w')
            doc_file.write('待完善')
            doc_file.close()
            self.redirect('/edit.html?path=' + path)

class AuthHandler(BaseHandler):
    def get(self):
        user = self.get_current_user()
        if user is None or user.get('username') is None:
            self.render('login.html')
        else:
            self.write('h2')
    def post(self):
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        
class UmlHandler(BaseHandler):
    def get(self):
        self.render('uml.html')
class RegHandler(BaseHandler):
    def get(self):
        self.render('reg.html')
    def post(self):
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        email = self.get_argument('email','')
         
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                ('/edit.html',EditHandler),
                ('/save.html',EditHandler),
                ('/auth.html',AuthHandler),
                ('/reg.html',RegHandler),
                ('/uml.html',UmlHandler),
                ('/.*',PreviewHandler),
                ]
       
        tornado.web.Application.__init__(self,handlers,**settings)
def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
