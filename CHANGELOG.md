# 0.3.0-alpha(2022-07-27)
### 新增功能
+ MSSQL 支持！🎉

### 修复 bug
+ 导致 table 页在某些颜色主题下异常丑陋
+ 导致 CockroachDB 连接异常（自动变成 PostgreSQL（设计缺陷））

### 优化
+ 优化连接 upsert 逻辑

### 删除功能
+ 删除并不完善的“系统终端”功能（我还会回来的）

# 0.2.4-beta(2022-07-18)
### 新增功能
+ 数据排序
+ 数据搜索
+ 查看当前 SQL

### 修复 bug
+ cockroach 连接问题
+ 数据页，多行不显示问题

# 0.2.3-beta(2022-07-12)
### 新增功能
+ 通过 url 添加连接

### 修复 bug
+ upsert 连接时的字段限制
+ [issue#10](https://github.com/ppz-pro/ppz.vscode/issues/10)

### 优化
+ 优化了一些样式

# 0.2.2-beta(2022-07-06)
### 新增功能
+ 模拟 sql 终端

# 0.2.1-beta(2022-07-04)
### 新增功能
+ 按 schema 导出数据和表结构

> schema 即 MySQL 中的 database  
> pgsql 依然不支持导出表结构

### 修复 bug
+ [issue#9](https://github.com/ppz-pro/ppz.vscode/issues/9)

### 优化
+ 优化 KnexConnection 逻辑

# 0.2.0-beta(2022-06-28)
### 新增功能
+ 数据和表结构导出

> pgsql 不支持导出表结构

### 修复 BUG
+ 日期类型的显示不直观
+ 日期类型不能保存