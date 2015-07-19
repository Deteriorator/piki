import os

from handler.base import BaseHandler
from urllib.parse import unquote
from setting import settings
import tornado

class PreviewHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        print('99999999999')
        url = self.request.uri
        if url == '/':
            url = '/index.md'
        path = url.split('/')[-1]
        path = unquote(path)
        doc_path = settings['doc_path'] + path
        if os.path.exists(doc_path):
            doc_file = open(doc_path,'r')
            markdown = doc_file.read()
            doc_file.close()
            self.render("index.html",doc=markdown,path=path)
        else:
            doc_file = open(doc_path,'w')
            doc_file.write('待完善')
            doc_file.close()
            self.redirect('/edit.html?path=' + path)
