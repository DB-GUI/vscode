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
[$(preview) Usage](https://gitee.com/ppz-pro/ppz.vscode/wikis/pages)
[$(comment) Advice](https://gitee.com/ppz-pro/ppz.vscode/issues)
[$(bug) Issue](https://gitee.com/ppz-pro/ppz.vscode/issues)
[🐈 Cat!](command:ppz.love)
[$(trash) Empty PPz](command:ppz.empty)`
    }
  }
}
