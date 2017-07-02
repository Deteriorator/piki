from tornado.process import Subprocess
from subprocess import PIPE
from tornado import gen
from handler.base import BaseHandler
import re
import setting

class SearchHandler(BaseHandler):
    @gen.coroutine
    def get(self,command):
        process = Subprocess(['grep python ../wiki/*.md'], stdout=PIPE, stderr=PIPE, shell=True)
        yield process.wait_for_exit()  # This waits without blocking the event loop.
    
        out, err = process.stdout.read(), process.stderr.read()
        posts = re.findall('wiki/(.*.md)(.*)',out.decode())
        self.render('{theme}/search.html'.format(theme=setting.theme), posts=posts)
