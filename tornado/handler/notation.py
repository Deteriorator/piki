import setting
import logging

from handler.base import BaseHandler
from util.notation import Notation

class NotationHandler(BaseHandler):
    def get(self, url):
        notation = Notation(url)
        self.render('{theme}/notation.html'.format(theme=setting.theme), notation=notation)
