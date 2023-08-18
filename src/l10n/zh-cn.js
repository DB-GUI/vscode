const { version, beta } = require('../../package.json')

exports.contribution = {
  views: {
    connection: {
      name: '连接',
      welcome: `[创建连接](command:ppz.addConnection)`,
    },
    about: {
      name: '关于',
      welcome: `关系型数据库的图形界面
v${version}${beta ? '-beta' : ''}
[使用帮助](https://gitee.com/ppz-pro/ppz.vscode/wikis/pages)
[意见反馈](https://gitee.com/ppz-pro/ppz.vscode/issues)
[导出配置](https://gitee.com/ppz-pro/ppz.vscode/issues)
[$(trash) 清空 PPz](command:ppz.empty)
[🐈 猫咪!](command:ppz.love)`
    }
  }
}
