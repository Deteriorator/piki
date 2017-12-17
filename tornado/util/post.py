import re
import os

class Post():
    def __init__(self,url):
        path = os.getcwd().replace('tornado','wiki')
        with open('{path}/{url}'.format(path=path,url=url)) as f:
        #with open('{path}/{url}'.format(path=path,url=url), encoding='ISO-8859-1') as f:
            markdown = f.read()
            images = re.findall('!\[.*\]\((.*)\)',markdown)
            for image in images:
                markdown = markdown.replace(image, '/static/wiki/{url}/{image}'.format(url=url[0:-3], image=image))

            self.markdown = markdown
            title = re.findall('title:(.*)', self.markdown)
            create_time = re.findall('date:(.*)', self.markdown)

            self.create_time = '' if len(create_time) == 0 else create_time[0]
            self.title = url if len(title) == 0 else title[0] 

            self.url = url
