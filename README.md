# todo
+ 把各 adapter 分离出去，似乎有懒安装的方法(https://github.com/cweijan/vscode-database-client/blob/e8e62c699c80ad35744efc9ecf4e86728dca5d7c/src/vue/connect/component/SQLite.vue#L28)
+ 把各 功能（request、持久化、恢复状态等）分离出去

### upsert 页面
+ 增加“测试连接”

### 已知 bug
+ upsert-connection 页面，在 name 字段未发生改变时，即使使用“保存”（而非“连接并保存”）按钮，也会导致发生连接（似乎是 vscode 的 bug）
+ upsert-connection 页面，更新连接时，“连接并保存”按钮不会被展开（似乎是 vscode 的 bug）