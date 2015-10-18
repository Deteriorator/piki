import hashlib

from handler.auth import AuthHandler

class UserHandler(AuthHandler):
    def get_user_by_np(self,username,password):
        cur = self.db.cursor()
        cur.execute("select * from piki_user where username=:username and password=:password",{'username':username,'password':password})
        user = cur.fetchone()
        cur.close()
        return user
    def get(self):
        path = self.request.uri
        path = path[path.rfind('/')+1:path.find('.html')]
        getattr(self,'get_'+path)() 

    def post(self):
        path = self.request.uri
        path = path[path.rfind('/')+1:path.find('.html')]
        getattr(self,'post_'+path)() 

    def post_login(self):
        """ 
        用户登录
        """
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        
        passwd = hashlib.md5(password.encode()).hexdigest() 
        user = self.get_user_by_np(username,passwd)

        if user is None:
            self.render('user/login.html')
        else:
            print('userid',user[0])
            self.set_secure_cookie('wiki_moseeker_com_user',str(user[0]))
            self.redirect('/')

    def get_login(self):
        if self.current_user:
            self.redirect(self.reverse_url('/'))
        else:
            self.render('user/login.html')
