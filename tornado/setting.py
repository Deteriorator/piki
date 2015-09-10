# encoding=utf-8
import os

settings = dict(
    template_path = os.path.join(os.path.dirname(__file__),"template"),
    static_path = os.path.join(os.path.dirname(__file__),"static"),
    # xsrf_cookies = True,
    cookie_secret = "test",
    secure_cookie = "testtest",
    login_url = "/auth.html",
    doc_path = os.path.join(os.path.dirname(__file__),"../wiki/"),
    user_db = os.path.join(os.path.dirname(__file__),"../wiki/user.db"),
    debug = True,
    mydb = os.path.join(os.path.dirname(__file__),'../db/user.db'),
    port=8888,
    headers = [
        ['研发','研发.md'],
        ['运维','运维.md'],
        ['IT支持','it支持.md'],
        ['公司规章','公司规章.md']
        ]
)
