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
    port=9999,
    headers = [
        ['研发','http://wiki.moseeker.com/%E7%A0%94%E5%8F%91.md'],
        ['运维','http://wiki.moseeker.com/%E8%BF%90%E7%BB%B4.md'],
        ['IT支持','http://wiki.moseeker.com/IT%E6%94%AF%E6%8C%81.md'],
        ['公司规章','http://wiki.moseeker.com/%E5%85%AC%E5%8F%B8%E8%A7%84%E7%AB%A0.md']
        ]
)
