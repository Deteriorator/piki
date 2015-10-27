## About piki

piki is a wiki writen by python.

# How to contribute

Fork and send pull request.

## How to run piki on your own machine

1. install all required modules:

```
shell> pip3 install -r requirements.txt
```

2. create wiki depository : execute shell in root dir

```
shell> mkdir wiki
```
3. run init script :
```
> cd db;
> python3 init.py
```
default account is 'admin', the password is 'admin' also.

4. cp tornado/setting-sample.py tornado/setting.py and change setting to fit your enviroment.

5. check above, using ``python3 wiki.py`` to start server.

# TODO
