#!/usr/bin/env python3
import tornado.httpserver
import tornado.ioloop
import tornado.web
import pymysql

from tornado.options import options
from setting import settings

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
                ('/uml.html',UmlHandler),
                ('/.*',PreviewHandler),
                ]
        self.db = pymysql.Connection(
                host=settings['db_host'],
                db = settings['db_name'],
                user = settings['db_user'],
                charset = 'utf8',
                connect_timeout=28800,
                passwd = settings['db_password'],
                init_command =  settings['db_init_command']
                )
       
        tornado.web.Application.__init__(self,handlers,**settings)
    def __del__(self):
        print('db closing...')
        self.db.close()

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
