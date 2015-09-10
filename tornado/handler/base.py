import tornado.web
import os
import shutil
import time

from setting import settings

class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
        return self.application.db

    def write_file(self,filename,content):
        path = settings['doc_path'] + filename 
        if os.path.exists(path):
            shutil.move(path,path+time.strftime("%Y%m%d%H%M"))
        doc_file = open(path,'w')
        doc_file.write(content)
        doc_file.close()

    def get_current_user(self):
        user_id = self.get_secure_cookie('wiki_moseeker_com_user')
        if not user_id:
            return None
        user = self.db.get_user(user_id)
        return  user
