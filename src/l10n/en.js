const { version, beta } = require('../../package.json')

exports.contribution = {
  views: {
    connection: {
      name: 'Connection',
      welcome: `[New Connection](command:ppz.addConnection)`,
    },
    about: {
      name: 'About',
      welcome: `UI for sql database
v${version}${beta ? '-beta' : ''}
[Usage](https://gitee.com/ppz-pro/ppz.vscode/wikis/pages)
[Fallback](https://gitee.com/ppz-pro/ppz.vscode/issues)
[🐈 Cat!](command:ppz.love)
[Empty PPz](command:ppz.empty)`
    }
  }
}
