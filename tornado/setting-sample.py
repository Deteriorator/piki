# encoding=utf-8
import os

settings = dict(
    template_path = os.path.join(os.path.dirname(__file__),"template"),
    static_path = os.path.join(os.path.dirname(__file__),"static"),
    # xsrf_cookies = True,
    cookie_secret = "www_forgetwall_com_user",
    secure_cookie = "www_forgetwall_com_user",
    login_url = "/user/login.html",
    doc_path = os.path.join(os.path.dirname(__file__),"../wiki/"),
    debug = True,
    mydb = os.path.join(os.path.dirname(__file__),'../db/piki.db'),
    mail_from = '',
    mail_send = '',
    mail_smtp = '',
    mail_user = '',
    mail_pass = '',
    port=8888,
    headers = [
        ['研发','研发.md'],
        ['运维','运维.md'],
        ['IT支持','it支持.md'],
        ['公司规章','公司规章.md']
        ]
)
