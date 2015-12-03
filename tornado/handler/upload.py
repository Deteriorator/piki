import time
import os

from handler.auth import AuthHandler
from setting import settings

class UploadHandler(AuthHandler):
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
