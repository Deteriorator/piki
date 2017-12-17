import re
import os

class Notation():
    def __init__(self,url):
        path = os.getcwd().replace('tornado','wiki')
        with open('{path}/{url}'.format(path=path,url=url)) as f:
            csv = f.read()
            csv = csv.split('^^')
            self.title = csv[0]
            self.sn = csv[1] 
            self.an = csv[2]
            self.mc = csv[3]
            self.lc = csv[4]
            self.kn = csv[5]
            self.rt = csv[6]
            self.datain= csv[7]
            self.fi = csv[8]
            self.ly = csv[9]
            self.nt = csv[10]
