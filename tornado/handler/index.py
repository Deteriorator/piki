import os
import re
import tornado
import time
import logging
import setting

from handler.base import BaseHandler
from urllib.parse import unquote
from util.post import Post

class IndexHandler(BaseHandler):
    def get(self):
        path = os.getcwd().replace('tornado','wiki')
        files = os.listdir(path)
        recents = []
        for item in files:
            if not item.startswith('_') and item.endswith('.md'):
                recents.append(item)

        recents.sort(key=lambda f: os.stat('{path}/{f}'.format(path=path, f=f)).st_ctime, reverse=True)
        posts = []
        for f in recents[0:15]:
            logging.debug('file:{f}'.format(f=f))
            posts.append(Post(f))

        self.render('{theme}/index.html'.format(theme=setting.theme), posts = posts)
