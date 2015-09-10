#!/usr/bin/env python3
import tornado.httpserver
import tornado.ioloop
import tornado.web

from tornado.options import options
from setting import settings
from database.mydb import MyDB

from handler.edit import EditHandler
from handler.auth import AuthHandler
from handler.reg import RegHandler
from handler.uml import UmlHandler
from handler.preview import PreviewHandler

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                ('/edit.html',EditHandler),
                ('/save.html',EditHandler),
                ('/auth.html',AuthHandler),
                ('/reg.html',RegHandler),
                ('/\S*.uml$',UmlHandler),
                ('/\S*.md$',PreviewHandler),
                ('/',PreviewHandler),
                ]
        self.db = MyDB(settings['mydb'])
       
        tornado.web.Application.__init__(self,handlers,**settings)

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(settings['port'])
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
