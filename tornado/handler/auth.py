from handler.base import BaseHandler
import hashlib

class AuthHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect(self.reverse_url('/'))
        else:
            self.render('login.html')

    def post(self):
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        
        passwd = hashlib.md5(password.encode()).hexdigest() 
        cur = self.db.cursor()
        cur.execute('select id,realname from dq_user where account = %s and password = %s',(username,passwd))
        user = cur.fetchone()
        if not user:
            self.render('login.html')
        else:
            user_id = user[0]
            self.set_secure_cookie('wiki_moseeker_com_user',str(user_id))
            self.redirect('/')
