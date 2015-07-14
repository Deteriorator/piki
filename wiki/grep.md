#### 实例                                                                   

* nginx代理了多个网站，每个配置文件名都是用四位端口命名，如何查找最大的端口号？
````
ls /etc/nginx/sites-enabled/ -rl \
| awk {'print $8 } \
| grep -Eo '^[0-9]{4}' \
| head -n 1
````
ls -rl : 倒序排列让端口号最大的文件排在第一；
print $8 : 只输出文件名

* 在指定文件类型中查找
````
grep -R print --include="*.py" ./
````
在所有py文件中查找print.