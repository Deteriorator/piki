度校园开放研究云平台是使用Hadoop搭建，使用一台服务器做为hadoop集群的client,用户通过web方式登录到client使用hadoop集群。但由于用户滥用client的硬盘资源，很快1.4T的/home目录就被用完了。为了防止用户滥用，使用quota对用户做了使用限制。以下是处理过程。


## 编辑fstab添加quota选项
 <pre><code class="bash">
cat /etc/fstab
/dev/sda1  /boot    ext2   defaults                   0 0
/dev/sda2  swap     swap   defaults                   0 0
/dev/sda3  /home    ext3   defaults,usrquota,grpquota 0 0
tmpfs      /dev/shm tmpfs  defaults                   0 0
devpts     /dev/pts devpts defaults                   0 0
proc       /proc    proc   defaults                   0 0
 </code></pre>
## 重启或重新挂载home目录
因为有用户使用，没有选择重启
 <pre><code>
mount -o remount /dev/sda3
</code></pre>
检查：
 <pre></code>
mount | grep quota
</code></pre>
## 生成quota的配置文件
 <pre></code>
quotacheck -cugm /dev/sda3
</code></pre>
检查：
 <pre><code>
ls /home | grep quota
</code></pre>
### 让quota在/dev/sda3上生效
 <pre><code>
quotaon /dev/sda3
</code></pre>
## 配置用户限制
配置对用户的限制有三种方式
1，edquota: 此命令会打开文本编辑器，手动设置.
 <pre><code>
edquota -u username
</cod></pre>
如果用户多的话，可使用edquota -p 将已配置好的用户限制复制给其它用户
 <pre><code>
edquota -p username -u username1 username2 ... usernamen
</code></pre>
2,setquota
为了和注册程序相关联，我们使用setquota方式
在注册程序中添加代码：
 <pre><code>
setquota -u $username 8000000 10000000 100 200 /home
</code></pre>
参数：
1,用户名
2,空间软限制(单位K)
3,空间硬件限制
4,文件数软限制
5,文件数硬件限制
6,挂载点
## 查看配置情况
- 打印所有报告：
```
repquota -a
```
- 查看某用户
```
quota -u <username>
```