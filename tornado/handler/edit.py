from handler.base import BaseHandler
from setting import settings

class EditHandler(BaseHandler):
    #@tornado.web.authenticated
    def get(self):
        path = self.get_argument("path","")
        print('path',path)
        doc = ""
        if path != "":
            doc_file = open(settings['doc_path'] + path,'r')
            doc = doc_file.read()
            doc_file.close()
        self.render("editor.html",doc=doc,path=path)

    def post(self):
        md = self.get_argument('md')
        doc = self.get_argument('doc')
        self.write_file(md,doc)
        self.write('1')
