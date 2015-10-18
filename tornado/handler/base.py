import os
import shutil
import time
import tornado.web

from handler.auth import AuthHandler
from setting import settings

class BaseHandler(AuthHandler):
    def write_file(self,filename,content):
        path = settings['doc_path'] + filename 
        if os.path.exists(path):
            shutil.move(path,path+time.strftime("%Y%m%d%H%M"))
        doc_file = open(path,'w')
        doc_file.write(content)
        doc_file.close()

    @tornado.web.authenticated
    def get(self):
        getattr(self,'get_')() 

    @tornado.web.authenticated
    def post(self):
        getattr(self,'post_')() 
