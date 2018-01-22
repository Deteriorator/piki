import os
from handler.base import BaseHandler

class UploadHandler(BaseHandler):

    def get(self):
        self.render('upload.html')

    def post(self):
        f = self.request.files['f'][0]
        fname = f['filename']
        extension = os.path.splitext(fname)[1]
        new_name = 'test'
        final_filename= new_name+extension
        with open('/tmp/' + final_filename, 'wb') as output_file:
            output_file.write(f['body'])
        self.write('Thanks')
