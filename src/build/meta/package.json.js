import { version } from '../../../package.json'
import util_meta from '@/common/util_meta'
import key from '@/common/constant/key'

const container_view = {
  id: 'ppz_view_container',
  title: 'PPz View',
  icon: 'asset/icon/inherit.svg'
}
const view_about = {
  id: util_meta.key_and('.about'),
  name: util_meta.l10n('views.about.name'),
  icon: 'asset/icon/inherit.svg',
}
const view_connection = {
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
        view_connection,
        view_about,
      ]
    },
    viewsWelcome: [
      {
        view: view_connection.id,
        contents: util_meta.l10n('views.connection.welcome')
      },
      {
        view: view_about.id,
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
  }
}
