## 关于Piki

Piki是使用Pyton创建的一个wiki（blog）系统，不需要数据库，每个wiki（blog）都是一个markdown文件，系统高度可配置。

## 如何使用

* Piki需要在Python3下运行，请首先安装Python3
* 获取源代码

```
get clone https://github.com/wancheng/piki.git
```
* 安装依赖包
```
shell> cd piki/tornado
shell> sudo pip3 install -r requirements.txt
```

* 修改配置文件
```
shell> cp tornado/setting-sample.py tornado/setting.py
```

* 运行程序
```
shell> python3 app.py
```

如果一切顺利，你可以在浏览里访问：http://localhost:8888,看到一个属于你自己的wiki（blog）


## 如何配置

# TODO
