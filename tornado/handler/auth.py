from handler.base import BaseHandler

class AuthHandler(BaseHandler):
    def get(self):
        user = self.get_current_user()
        if user is None or user.get('username') is None:
            self.render('login.html')
        else:
            self.write('h2')
    def post(self):
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        

