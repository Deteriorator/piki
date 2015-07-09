#!/usr/bin/env python3
import os
import tornado.httpserver
import tornado.ioloop
import tornado.web
import shutil

from tornado.options import options
from setting import settings

class EditHandler(tornado.web.RequestHandler):
    def get(self):
        print('----- edit get -----')
        path = self.get_argument("path","")
        print(path)
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
            shutil.move(path,path+'.old')
        doc_file = open(settings['doc_path'] + md,'w')
        doc_file.write(doc)
        doc_file.close()
        self.write('1')

class PreviewHandler(tornado.web.RequestHandler):
    def get(self):
        print('-----------preview get -----------')
        url = self.request.uri
        print(url)
        print(type(url))
        if url == '/':
            url = '/index.md'
        path = url.split('/')[-1]
        print(path)
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
            print(path)
            self.redirect('/edit.html?path=' + path)

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                ('/edit.html',EditHandler),
                ('/save.html',EditHandler),
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
