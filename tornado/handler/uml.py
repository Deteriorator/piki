from handler.base import BaseHandler
import tornado.web

class UmlHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        path = self.request.uri
        path = path[path.rfind('/')+1:]
        path = unquote(path)

        doc_path = settings['doc_path'] + path
        uml = ''
        if os.path.exists(doc_path):
            doc_file = open(doc_path,'r')
            uml = doc_file.read()
            doc_file.close()
        self.render('uml.html',uml=uml,path=path)
    @tornado.web.authenticated
    def post(self):
        uml = self.get_argument('uml')
        path = self.get_argument('path')
        self.write_file(path,uml)
        self.write('1')
