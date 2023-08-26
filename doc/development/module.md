# PPz.vscode 模块
+ webview: 用户操作界面（运行时：浏览器）
+ core:（运行时：Node.js + vscode）
  + 主程序：启动 PPz.vscode，初始化 state、webview、connection view、命令
  + webview 之外的用户操作界面，包括“左侧 treeview”、“通知”等
+ build: 生成、转移配置文件
