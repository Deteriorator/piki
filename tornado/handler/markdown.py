import setting
import logging

from handler.base import BaseHandler
from util.post import Post

class MarkdownHandler(BaseHandler):
    def get(self, url):
        post = Post(url)
        self.render('{theme}/post.html'.format(theme=setting.theme), p=post)
