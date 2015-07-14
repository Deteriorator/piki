#### 常用命令实例
* 创建数据和用户
```
# mysql -u root -p
mysql> create database db_name;
mysql> create user db_user;
mysql> grant all on db_name.* to 'db_user'@'db_name' identified by 'password';
mysql> source data.sql;
```
* 命令行下执行sql文件
```
mysql db_name < db.sql
```
* 导出远程数据库到本地
```
mysqldump -h[hosname] -u[user_name] -p[password] --default-character-set=[char_set_name] [db_name] > [save_path]
```
注：-p和password之间没有空格。
 
#### MySQL的mysqldump工具的基本用法
导出要用到MySQL的mysqldump工具，基本用法是：
shell> mysqldump [OPTIONS] database [tables]
如果你不给定任何表，整个数据库将被导出。
通过执行mysqldump --help，你能得到你mysqldump的版本支持的选项表。
注意，如果你运行mysqldump没有--quick或--opt选项，mysqldump将在导出结果前装载整个结果集到内存中，如果你正在导出一个大的数据库，这将可能是一个问题。
mysqldump支持下列选项：
--add-locks
在每个表导出之前增加LOCK TABLES并且之后UNLOCK TABLE。(为了使得更快地插入到MySQL)。
--add-drop-table
在每个create语句之前增加一个drop table。
--allow-keywords
允许创建是关键词的列名字。这由表名前缀于每个列名做到。
-c, --complete-insert
使用完整的insert语句(用列名字)。
-C, --compress
如果客户和服务器均支持压缩，压缩两者间所有的信息。
--delayed
用INSERT DELAYED命令插入行。
-e, --extended-insert
使用全新多行INSERT语法。（给出更紧缩并且更快的插入语句）
-#, --debug[=option_string]
跟踪程序的使用(为了调试)。
--help
显示一条帮助消息并且退出。
--fields-terminated-by=...

--fields-enclosed-by=...

--fields-optionally-enclosed-by=...

--fields-escaped-by=...

--fields-terminated-by=...
这些选择与-T选择一起使用，并且有相应的LOAD DATA INFILE子句相同的含义。
LOAD DATA INFILE语法。
-F, --flush-logs
在开始导出前，洗掉在MySQL服务器中的日志文件。
-f, --force,
即使我们在一个表导出期间得到一个SQL错误，继续。
-h, --host=..
从命名的主机上的MySQL服务器导出数据。缺省主机是localhost。
-l, --lock-tables.
为开始导出锁定所有表。
-t, --no-create-info
不写入表创建信息(CREATE TABLE语句）
-d, --no-data
不写入表的任何行信息。如果你只想得到一个表的结构的导出，这是很有用的！
--opt
同--quick --add-drop-table --add-locks --extended-insert --lock-tables。
应该给你为读入一个MySQL服务器的尽可能最快的导出。
-pyour_pass, --password[=your_pass]
与服务器连接时使用的口令。如果你不指定“=your_pass”部分，mysqldump需要来自终端的口令。
-P port_num, --port=port_num
与一台主机连接时使用的TCP/IP端口号。（这用于连接到localhost以外的主机，因为它使用 Unix套接字。）
-q, --quick
不缓冲查询，直接导出至stdout；使用mysql_use_result()做它。
-S /path/to/socket, --socket=/path/to/socket
与localhost连接时（它是缺省主机)使用的套接字文件。
-T, --tab=path-to-some-directory
对于每个给定的表，创建一个table_name.sql文件，它包含SQL CREATE 命令，和一个table_name.txt文件，它包含数据。 注意：这只有在mysqldump运行在mysqld守护进程运行的同一台机器上的时候才工作。.txt文件的格式根据--fields-xxx和--lines--xxx选项来定。
-u user_name, --user=user_name
与服务器连接时，MySQL使用的用户名。缺省值是你的Unix登录名。
-O var=option, --set-variable var=option设置一个变量的值。可能的变量被列在下面。
-v, --verbose
冗长模式。打印出程序所做的更多的信息。
-V, --version
打印版本信息并且退出。
-w, --where='where-condition'
只导出被选择了的记录；注意引号是强制的！
"--where=user='jimf'" "-wuserid>1" "-wuserid<1"
最常见的mysqldump使用可能制作整个数据库的一个备份：
mysqldump --opt database > backup-file.sql
但是它对用来自于一个数据库的信息充实另外一个MySQL数据库也是有用的：
mysqldump --opt database | mysql --host=remote-host -C database
由于mysqldump导出的是完整的SQL语句，所以用mysql客户程序很容易就能把数据导入了：
shell> mysqladmin create target_db_name
shell> mysql target_db_name < backup-file.sql
就是
shell> mysql 库名 < 文件名
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
几个常用用例：
1.导出整个数据库
 mysqldump -u 用户名 -p 数据库名 > 导出的文件名
 mysqldump -u wcnc -p smgp_apps_wcnc > wcnc.sql
2.导出一个表
 mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名
 mysqldump -u wcnc -p smgp_apps_wcnc users> wcnc_users.sql
3.导出一个数据库结构
  mysqldump -u wcnc -p -d --add-drop-table smgp_apps_wcnc >d:\wcnc_db.sql
 -d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table
4.导入数据库
  常用source 命令
  进入mysql数据库控制台，
  如mysql -u root -p

  mysql>use 数据库
  然后使用source命令，后面参数为脚本文件（如这里用到的.sql）
  mysql>source d:\wcnc_db.sql