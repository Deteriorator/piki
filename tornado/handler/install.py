import os
import tornado
import datetime
import hashlib
from handler.base import BaseHandler
from setting import settings

class InstallHandler(BaseHandler):
    def get(self):
        if self.check_install():
            self.render('user/install.html')
        else:
            self.redirect('/')

    def post(self):
        if self.check_install():
            admin = (
                self.get_argument('username'),
                self.get_argument('realname'),
                hashlib.md5(self.get_argument('password').encode()).hexdigest(),
                self.get_argument('email')
                )

            cur = self.db.cursor()
            cur.execute("CREATE TABLE piki_user (id INTEGER primary key,username text,password text,realname text,email text)")
            cur.execute("CREATE TABLE piki_wiki (id INTEGER primary key,title TEXT,markdown TEXT,creator TEXT,create_time TEXT,pv INTEGER)")
            cur.execute("CREATE TABLE piki_subscription(id INTEGERY primary key,uid INTEGERY,wid INTEGERY,create_time text)")
            cur.execute("insert into piki_user (username,realname,password,email) values (?,?,?,?)",admin)
        self.redirect('/')
        
    def check_install(self):
        cur = self.db.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='piki_user'")
        user = cur.fetchone()
        return user is None

