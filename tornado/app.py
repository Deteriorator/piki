import tornado.httpserver
import tornado.ioloop
import tornado.web
import logging

from setting import tornado_settings
from handler.index import IndexHandler
from handler.markdown import MarkdownHandler
from handler.search import SearchHandler

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                ('/', IndexHandler),
                ('/(.+.md)', MarkdownHandler),
                ('/search/(.*)', SearchHandler),
                ]
        tornado.web.Application.__init__(self,handlers,**tornado_settings)

def main():
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(tornado_settings['port'])
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
