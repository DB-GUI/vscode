import { version } from '../../../package.json'
import util_meta from '@/common/util_meta'
import key from '@/common/constant/key'

const container_view = {
  id: 'ppz_view_container',
  title: 'PPz View',
  icon: 'asset/icon/inherit.svg'
}
const about_view = {
  id: util_meta.key_and('.about'),
  name: util_meta.l10n('views.about.name'),
  icon: 'asset/icon/inherit.svg',
}
const connection_view = {
  id: key.view.id.connection,
  name: util_meta.l10n('views.connection.name'),
  icon: 'asset/icon/inherit.svg',
}

const category = util_meta.name

export default {
  name: util_meta.key,
  displayName: util_meta.name,
  description: 'UI for database management',
  version,
  publisher: 'ppz',
  icon: './asset/icon/ppz.png',
  main: './main.js',
  engines: {
    vscode: '^1.47.3'
  },
  activationEvents: [
    'onStartupFinished'
  ],
  contributes: {
    viewsContainers: {
      activitybar: [container_view]
    },
    views: {
      [container_view.id]: [
        connection_view,
        about_view,
      ]
    },
    viewsWelcome: [
      {
        view: connection_view.id,
        contents: util_meta.l10n('views.connection.welcome')
      },
      {
        view: about_view.id,
        contents: util_meta.l10n('views.about.welcome')
      }
    ],
    commands: [
      {
        command: key.command.connection.add,
        title: 'add connection',
        icon: util_meta.icon('add'),
        category,
      }
    ],
    menus: { // 菜单项
      'view/title': [ // 出现在 view 的 title 栏的“菜单项”
        {
          when: 'view==' + connection_view.id, // 出现的位置（当 view 是 connection view 时）
          command: key.command.connection.add, // 点击“菜单项”执行的 command
          group: 'navigation',
        },
      ],
    },
  }
}
