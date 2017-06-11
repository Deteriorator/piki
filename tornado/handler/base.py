import os
import shutil
import time
import tornado.web
import setting

class BaseHandler(tornado.web.RequestHandler):
    def get_template_namespace(self):
        ns = super(BaseHandler, self).get_template_namespace()
        ns['url'] = setting.url
        ns['title'] = setting.title
        ns['subtitle'] = setting.subtitle
        ns['description'] = setting.description
        ns['categories'] = setting.categories
        ns['tags'] = setting.tags
        ns['headers'] = setting.headers
        ns['links'] = setting.links
        return ns

    def get(self):
        if self.current_user:
            self.redirect(self.reverse_url('/'))
        else:
            self.render('login.html')
    def write_file(self,filename,content):
        path = settings['doc_path'] + filename 
        if os.path.exists(path):
            shutil.move(path,path+time.strftime("%Y%m%d%H%M"))
        doc_file = open(path,'w')
        doc_file.write(content)
        doc_file.close()

    def get(self):
        getattr(self,'get_')() 

    def post(self):
        getattr(self,'post_')() 

