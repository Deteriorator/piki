import tornado.web
import os
import shutil
import time

from setting import settings

class BaseHandler(tornado.web.RequestHandler):
    def write_file(self,filename,content):
        path = settings['doc_path'] + filename 
        if os.path.exists(path):
            shutil.move(path,path+time.strftime("%Y%m%d%H%M"))
        doc_file = open(path,'w')
        doc_file.write(content)
        doc_file.close()

    def get_current_user(self):
        user = {}
        user_id = self.get_secure_cookie('wiki_user')
        if not user_id:
            return user
        db_file = open(settings['user_db'],'r')
        db = db_file.read()
        db_file.close()
        for line in db:
            line = line.split('\t')
            if line[0] == user_id:
                user['username'] = line[1]
                user['password'] = line[2]
                user['email'] = line[3]
        return user
