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
    port=9999,
    mail_from = 'Moseeker <notifications@moseeker.com>',
    mail_send = 'notifications@moseeker.com',
    mail_smtp = 'mail.moseeker.com',
    mail_user = 'notifications',
    mail_pass = 'nts@dqqx',
    headers = [
        ['研发','/%E7%A0%94%E5%8F%91.md'],
        ['运维','/%E8%BF%90%E7%BB%B4.md'],
        ['IT支持','/IT%E6%94%AF%E6%8C%81.md'],
        ['公司规章','/%E5%85%AC%E5%8F%B8%E8%A7%84%E7%AB%A0.md']
        ]
)
