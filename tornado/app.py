import tornado.httpserver
import tornado.ioloop
import tornado.web
import logging
import logging.config
import logging_config

from setting import tornado_settings
from handler.index import IndexHandler
from handler.markdown import MarkdownHandler
from handler.notation import NotationHandler
from handler.search import SearchHandler
from handler.upload import UploadHandler

logging.config.dictConfig(logging_config.config)

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                ('/', IndexHandler),
                ('/(.+.md)', MarkdownHandler),
                ('/(.+.mn)', NotationHandler),
                ('/search/(.*)', SearchHandler),
                ('/upload', UploadHandler),
                ]
        tornado.web.Application.__init__(self,handlers,**tornado_settings)

def main():
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(tornado_settings['port'])
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    logger = logging.getLogger(__name__)
    logger.info('Server starting...')
    main()
