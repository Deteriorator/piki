import sqlite3
import hashlib

conn = sqlite3.connect('piki.db')
cur = conn.cursor()
cur.execute("""
    CREATE TABLE piki_user (id INTEGER primary key,username text,password text,realname text,email text)
    """);

cur.execute("""
    CREATE TABLE piki_wiki (id INTEGER primary key,title TEXT,markdown TEXT,creator TEXT,create_time TEXT,pv INTEGER)
    """);

cur.execute("""
    CREATE TABLE piki_subscription(id INTEGERY primary key,uid INTEGERY,wid INTEGERY,create_time text)
    """);

passwd = hashlib.md5('admin'.encode()).hexdigest() 
cur.execute("insert into piki_user (username,realname,password,email) values (?,?,?,?)",('admin','admin',passwd,'admin@test.com'))

conn.commit()
conn.close()
