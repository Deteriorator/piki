CREATE TABLE piki_user (id INTEGER primary key,username text,password text,realname text,email text);
CREATE TABLE piki_wiki (id INTEGER primary key,title TEXT,markdown TEXT,creator TEXT,create_time TEXT,pv INTEGER);
CREATE TABLE piki_subscription(id INTEGERY primary key,uid INTEGERY,wid INTEGERY,create_time text);
