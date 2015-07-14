#### 根据关键字杀死一组进程                                                     
* version:1    
根据关键字找出进程列表，遍历进程表杀死进程。
  
```
for p in `ps -ef | grep adduser | grep -v grep | awk '{print $2}'; do kill -9 $p ; done
```
不足：命令太长，太麻烦！
  
* version:2    
使用pgrep命令简化查找进程列表。
```
for p in `pgrep adduser`; do kill -9 $p; done
```
不足：需要使用for,do,done还是太长，不好记，最好是一条命令搞定。
  
* version:3   
简化遍历过程，使用xargs传递进程参数。
  
```
pgrep adduser | xargs kill -9
```
  
*  version:4
```
pkill -9 adduser
```