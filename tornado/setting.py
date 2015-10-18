# encoding=utf-8
import os

settings = dict(
    template_path = os.path.join(os.path.dirname(__file__),"template"),
    static_path = os.path.join(os.path.dirname(__file__),"static"),
    # xsrf_cookies = True,
    cookie_secret = "test",
    secure_cookie = "testtest",
    login_url = "/user/login.html",
    doc_path = os.path.join(os.path.dirname(__file__),"../wiki/"),
    debug = True,
    mydb = os.path.join(os.path.dirname(__file__),'../db/piki.db'),
    mail_from = 'Moseeker <notifications@moseeker.com>',
    mail_send = 'notifications@moseeker.com',
    mail_smtp = 'mail.moseeker.com',
    mail_user = 'notifications',
    mail_pass = 'nts@dqqx',
    port=8888,
    headers = [
        ['研发','研发.md'],
        ['运维','运维.md'],
        ['IT支持','it支持.md'],
        ['公司规章','公司规章.md']
        ]
)
