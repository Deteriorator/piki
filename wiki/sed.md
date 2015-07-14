## delete

- 示例一：删除hadoop.list中所有包含nz-013的行
```
sed -i '/nz-013/'d hadoop.list
```

- 示例二：
```
#! /bin/bash
# 删除文件中所有author标签
for file in `grep -r author ./* | awk -F : '{print $1}'`
do
if [ $file != "./"$0 ]
then
sed -i '/author/'d $file
fi
done
```

## replace
```
sed 's/8080/8888/' server.xml
```
## insert
```
sed -i "1i package com.forgetwall" Test.java
```