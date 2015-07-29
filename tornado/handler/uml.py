from handler.base import BaseHandler
import tornado.web

class UmlHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('uml.html')
    @tornado.web.authenticated
    def post(self):
        uml = self.get_argument('uml')
        name = self.get_argument('name')
        self.write_file(name,uml)
        self.write('1')
