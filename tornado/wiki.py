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

def hex_to_chinese(path):
    if path.count('%') < 3:
        return path
    else:
        start = path.find('%')
        hexcode = path[start:start+9]
        bcode = bytes.fromhex(hexcode.replace('%',''))        
        path = path.replace(hexcode,bcode.decode())
        return hex_to_chinese(path)
class EditHandler(tornado.web.RequestHandler):
    def get(self):
        path = self.get_argument("path","")
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

class PreviewHandler(tornado.web.RequestHandler):
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
