#### 示例
* 出/var下大100M的文件
```
find /var/ -type f -size +100000k -exec ls -lh {} \; | awk '{print $9 ":" $5}'
```
  
* 批量下载blfs补丁包    
```
 #!/bin/sh
while read -r line
do
        echo $line | grep -q "<a"
        if [ $? -eq 0 ]
        then
                line=$(echo $line | awk -F 'href="' '{print $2}' | awk -F '"' '{print $1'})
                wget http://www.linuxfromscratch.org/blfs/downloads/svn/$line
        fi
done < blfs.html
```