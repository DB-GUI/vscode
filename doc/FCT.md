# 功能测试
纯手工测试虽然原始，但是非常可靠：你可以没有自动化测试，但一定要有功能测试  
以下列出各功能点

[使用 Docker 搭建测试数据库](https://zhuanlan.zhihu.com/p/546463994)

> 目前 ppz 不支持创建数据库、表的功能，可以使用 [Dbeaver](https://dbeaver.io/) 或 ppz 内置的模拟终端，来创建

### 连接
+ 连接管理

### 左侧 Treeview
+ 节点的展开与闭合
+ 节点刷新（包括“连接节点”、“数据库节点”等）
+ 右键菜单，菜单项的功能是否正常（比如点击“连接节点”的“编辑”，是否可以打开编辑页面）
+ 右键菜单，菜单项是否缺失或多余
  + mysql
    + 连接节点（编辑、删除 | SQL 终端）
    + 数据库节点（导出 DML、导出 DDL、导出 DML & DDL）
    + 表节点（导出 DML、导出 DDL、导出 DML & DDL）
  + sqlite3
    + 连接节点（编辑、删除 | 导出 DML、导出 DDL、导出 DML & DDL | SQL 终端）
    + 表节点（导出 DML、导出 DDL、导出 DML & DDL）
  + pgsql
    + 连接节点（编辑、删除 | SQL 终端）
    + 数据库节点（SQL 终端）
    + 模式节点（导出 DML、导出 DDL、导出 DML & DDL）
    + 表节点（导出 DML、导出 DDL、导出 DML & DDL）
  + mssql
    + 连接节点（编辑、删除 | SQL 终端）
    + 数据库节点（SQL 终端）
    + 模式节点（导出 DML、导出 DDL、导出 DML & DDL）
    + 表节点（导出 DML、导出 DDL、导出 DML & DDL）

### Table 页面
+ 页面头部“connection > database > schema > table”是否正确
+ 头部按钮
  + 刷新
  + 搜索
  + 字段过滤
  + 插入
  + 拷贝
  + 保存
  + 撤销
  + 删除
  + 查看 sql
  + 终端
+ 无主键的表
  + 在打开时，弹出警告：无主键，不能修改、删除数据
  + 保存、撤销、删除 按钮应处于禁用状态，且真的不可以点
+ 翻页功能
  + 刷新按钮
  + 页面大小输入框（点刷新按钮后触发数据加载）
  + 第一页按钮
  + 上一页按钮
  + 页号输入框（点刷新按钮后触发数据加载）
  + 下一页按钮
  + 最后一页按钮
+ 排序
+ 数据管理

### 插入记录页面
在新增、拷贝表记录时被打开
+ 被拷贝数据是否正常填充表单
+ 数据保存是否正确（注意时间类型的字段）

### sql 终端页面
随便执行几个 sql 语句吧……  
注意也要测测“多条语句一起执行”

### 左侧 Treeview 的“帮助与反馈”
> 主页面的左下角

+ 版本号是否更新
+ 微信群二维码是否过期
+ 各按钮能否正确跳转

### 其他
##### 页面的销毁与重建
各页面被隐藏时（比如先打开了某个表的页面 A，后又打开了另一个表的页面 B，B 打开之后，A 处于隐藏状态），都会被销毁，再次显示时重建  
因此，销毁时要保存当前页面的状态，再次打开时要恢复状态，这是一个非常容易出 bug 的点  

##### 不同的数据库
当前支持 MySQL、PostgreSQL、Sqlite3、MSSQL，对于不同的数据库，在底层有不同的逻辑，上层有不同的表现  
同一个功能在 MySQL 上没问题，可能在其他数据库就有问题

##### 颜色主题
vscode 有丰富的颜色主题供开发者选择，提升用户体验  
同时对插件开发者来说，也带来了挑战：
+ 页面上某些元素可能在特定的颜色模式下，很模糊或不明显或看不清
+ 对不同颜色的适配也可能出现 bug

多换几个颜色主题试试

##### 时区
有关时区的几个方面：
+ table 页面的展示与保存
+ 插入记录页面
+ 终端的 sql 语句里的时间和查询结果里的时间
+ 导出数据

## 提交 BUG
如果你发现了问题，可以在 [github](https://github.com/ppz-pro/ppz.vscode/issues) 或 [gitee](https://gitee.com/ppz-pro/ppz.vscode/issues) 的 issue 页面提交 BUG  
感谢！