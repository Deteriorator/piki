import sqlite3

conn = sqlite3.connect('piki.db')
cur = conn.cursor()

cur.execute("CREATE TABLE piki_user (id INTEGER primary key,username text,password text,realname text,email text")
cur.execute("CREATE TABLE piki_wiki (id INTEGER primary key,title TEXT,markdown TEXT,creator TEXT,create_time TEXT,pv INTEGER")
cur.execute("CREATE TABLE piki_subscription(id INTEGERY primary key,uid INTEGERY,wid INTEGERY,create_time text")
cur.execute("insert into piki_user (username,realname,password,email) values (?,?,?,?)",('admin','admin','21232f297a57a5a743894a0e4a801fc3','admin@qq.com')

conn.commit()
conn.close()
