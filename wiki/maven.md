#### 安装时跳过单元测试
```
mvn install -Dmaven.test.skip=true
```
#### 在mvn中运行指定类
* 使用java命令
```
mvn compile
java -cp target/class com.forgetwall.ccshop.Main
```
如果要加载一些jar包的话，就会麻烦一些
* 使用mvn exec:java命令
```
mvn compile exec:java -Dexec.mainClass="com.forgetwall.ccshop.Main"
```