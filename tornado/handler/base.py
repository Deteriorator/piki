import os
import shutil
import time
import tornado.web
import setting

class BaseHandler(tornado.web.RequestHandler):
    def get_template_namespace(self):
        ns = super(BaseHandler, self).get_template_namespace()
        ns['url'] = setting.url
        ns['title'] = setting.title
        ns['subtitle'] = setting.subtitle
        ns['description'] = setting.description
        ns['categories'] = setting.categories
        ns['tags'] = setting.tags
        ns['headers'] = setting.headers
        ns['links'] = setting.links
        return ns
