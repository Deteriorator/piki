#### 在Linux下安装redis
* 配置
* 启动
    * 以服务的方式启动
    修改redis.conf中的daemonize为yes（默认是no)
* 测试
```
$ sudo pip install redis
$ python
Python 2.7.6 (default, Mar 22 2014, 22:59:56)
[GCC 4.8.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import redis
>>> conn = redis.Redis()
>>> conn.set('hello','world')
True
>>> conn.get('hello')
'world'
````