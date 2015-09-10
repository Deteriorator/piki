from handler.base import BaseHandler
from setting import settings
import hashlib
import pymysql
import json

class AuthHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect(self.reverse_url('/'))
        else:
            self.render('login.html')

    def post(self):
        """ 
        用户登录
        """
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        
        passwd = hashlib.md5(password.encode()).hexdigest() 
        user = self.db.get_user_by_np(username,passwd)

        if not user:
            self.render('login.html')
        else:
            print('userid',user[0])
            self.set_secure_cookie('wiki_moseeker_com_user',str(user[0]))
            self.redirect('/')
