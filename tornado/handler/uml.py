from handler.base import BaseHandler

class UmlHandler(BaseHandler):
    def get(self):
        self.render('uml.html')
    def post(self):
        uml = self.get_argument('uml')
        name = self.get_argument('name')
        self.write_file(name,uml)
        self.write('1')
