import { version, beta } from '../../package.json'
import key from '@/common/constant/key'

export
const contribution = {
  views: {
    connection: {
      name: 'Connection',
      welcome: `[New Connection](command:${key.command.connection.add})`,
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
