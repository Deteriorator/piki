#!/usr/bin/env python3

import tornado.httpserver
import tornado.ioloop
import tornado.web
import sqlite3
import logging

from tornado.options import options
from setting import settings

from handler.uml import UmlHandler
from handler.md import MdHandler
from handler.td import TdHandler
from handler.user import UserHandler
from handler.upload import UploadHandler
from handler.gt import GtHandler
from handler.install import InstallHandler

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                (r'/user/.+.html',UserHandler),
                ('/.+.uml$',UmlHandler),
                ('/.+.md$',MdHandler),
                ('/.+.td$',TdHandler),
                ('/.+.gt$',GtHandler),
                ('/upload',UploadHandler),
                ('/install.html',InstallHandler),
                ('/',MdHandler),
                ]
        self.db = sqlite3.connect(settings['mydb'])

        tornado.web.Application.__init__(self,handlers,**settings)

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(settings['port'])
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
