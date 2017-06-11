import time
import os

from handler.base import BaseHandler
from setting import tornado_settings

class UploadHandler(BaseHandler):
    def get(self):
        self.render('upload.html')

    def post(self):
        f = self.request.files['f'][0]
        fname = f['filename']
        extension = os.path.splitext(fname)[1]
        new_name = str(time.time())
        final_filename= new_name+extension
        output_file = open(settings['static_path'] + '/wiki/' + final_filename, 'wb')
        output_file.write(f['body'])
        self.finish("static/wiki/" + final_filename) 
