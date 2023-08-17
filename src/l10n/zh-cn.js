const { version, beta } = require('../../package.json')

exports.contribution = {
  views: {
    connection: {
      name: '连接',
      welcome: `[创建连接](command:ppz.addConnection)`,
    },
    about: {
      name: '关于',
      welcome: `数据库图形化操作界面
v${version}${beta ? '-beta' : ''}
[$(preview) 使用帮助](https://gitee.com/ppz-pro/ppz.vscode/wikis/pages)
[$(comment) 意见反馈](https://gitee.com/ppz-pro/ppz.vscode/issues)
[$(bug) 发现 bug! ](https://gitee.com/ppz-pro/ppz.vscode/issues)
[🐈 可爱猫咪](command:ppz.love)
[$(trash) 清空 PPz](command:ppz.empty)`
    }
  }
}
