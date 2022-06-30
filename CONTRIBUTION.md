# PPZ.vscode 开发手册
开发 PPZ.vscode 分以下几步：
1. 安装 [vscode](https://code.visualstudio.com/) 和 [Node.js](https://nodejs.org/en/)
2. 克隆代码仓库
``` bash
git clone git@github.com:ppz-pro/ppz.vscode.git
```
3. 安装依赖
``` bash
cd ppz.vscode
npm install
```
4. 用 vscode 打开项目文件夹，按下键盘上的 ```f5```

## 技术储备
如果你做过网页开发或 Node.js 程序开发，那么 PPZ.vscode 用到的技术，你可能全都用到过

##### 依赖
PPZ.vscode 尽量使用较少的依赖，因此不需要阅读很多“框架”的文档

可以花两三分钟看一下“[uuid 用来生成唯一字符串](https://github.com/uuidjs/uuid)”、“[Type.js 在运行时检查数据类型](https://github.com/ppz-pro/type.js)” 

然后，[Vue.js](https://v3.cn.vuejs.org/) 用来构建 UI（只有 Vue.js 的核心，没有任何组件库或其他周边）

然后，[Knex.js](https://knexjs.org/) 可能要多花一些时间，它用来统一各数据库驱动的接口，有了它，就不用单独去阅读各数据库驱动的文档，几乎抹平了各数据库不同的操作

除了以上依赖，还有 [Node MySQL 2](https://github.com/sidorares/node-mysql2)（MySQL 系驱动）、[node-postgres](https://github.com/brianc/node-postgres)（pgsql 系驱动）、[node-sqlite3](https://github.com/TryGhost/node-sqlite3)（Sqlite3 驱动）。但有了 Knex.js，你几乎不需要看他们的文档（我好像就没看过……）

##### 非 web 开发程序员
如果你没参与过网页开发或 Node.js 开发，那么可能要先熟悉一下 js 的基础语法，和 [ES6 新语法](https://es6.ruanyifeng.com/)

##### vscode API
可能很少有朋友做过 vscode 插件，因此对 vscode 插件的生态也应该有一个大概的认识：
+ [vscode 开发极简教程](https://zhuanlan.zhihu.com/p/532031362)
+ [官方教程 “第一个插件”](https://code.visualstudio.com/api/get-started/your-first-extension)
+ [官方全面细致的教程](https://code.visualstudio.com/api/extension-guides/overview)
+ [vscode api](https://code.visualstudio.com/api/references/vscode-api)
