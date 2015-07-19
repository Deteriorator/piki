from handler.base import BaseHandler

class RegHandler(BaseHandler):
    def get(self):
        self.render('reg.html')
    def post(self):
        username = self.get_argument('username','')
        password = self.get_argument('password','')
        email = self.get_argument('email','')
