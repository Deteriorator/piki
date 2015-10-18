# -*- coding: utf-8 -*-
import torndb
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

db = torndb.Connection(
    host='admin.moseeker.com',
    database='zentao',
    user='daqi',
    password='5F51692091B4031640E18E7C27430E071BC878C8',
    time_zone='+8:00',
    charset='utf8'
)

users = db.query("select id,realname,password,account,email from dq_user")

user_file = open('user.db','w')
for user in users:
    user_str = "%d @@ %s @@ %s @@ %s @@ %s\n" % (user.id,user.realname,user.account,user.password,user.email)
    user_file.write(user_str)

user_file.close()
db.close()
