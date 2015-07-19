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
    db_host = 'admin.moseeker.com',
    db_name = 'zentao',
    db_user = 'daqi',
    db_password = '5F51692091B4031640E18E7C27430E071BC878C8',
)
