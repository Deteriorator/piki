import os
import re
import tornado
import time
import logging
import setting

from handler.base import BaseHandler
from urllib.parse import unquote
from util.post import Post

logger = logging.getLogger(__name__)

class IndexHandler(BaseHandler):

    def get(self):
        path = os.getcwd().replace('tornado','wiki')
        files = [filename for filename in os.listdir(path) if not filename.startswith('_') and filename.endswith('.md')]
        files_time = {}
        for f in files:
            stat_info = os.lstat('{path}/{f}'.format(path=path,f=f))
            files_time[stat_info.st_mtime] = f

        recents = [files_time[k] for k in sorted(files_time.keys(), reverse=True)] 

        posts = []
        for f in recents[:15]:
            logger.debug('file:{f}'.format(f=f))
            posts.append(Post(f))

        self.render('{theme}/index.html'.format(theme=setting.theme), posts = posts)
