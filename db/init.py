import sqlite3

conn = sqlite3.connect('piki.db')
cur = conn.cursor()

f = open('user.db')
for l in f.readlines():
    line = l.split(' @@ ')
    cur.execute("insert into piki_user (username,realname,password,email) values (?,?,?,?)",(line[2],line[1],line[3],line[4]))

f.close()
conn.commit()
conn.close()
