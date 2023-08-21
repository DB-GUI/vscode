import { version } from '../../package.json'
import { meta_util } from 'src/util'
import { key } from 'asset/constant/command'

const container_view = {
  id: 'ppz_view_container',
  title: 'PPz View',
  icon: 'public/icon/inherit.svg'
}
const view_about = {
  id: meta_util.key_and('.about'),
  name: meta_util.l10n('views.about.name'),
  icon: 'public/icon/inherit.svg',
}
const view_connection = {
  id: meta_util.key_and('.connection'),
  name: meta_util.l10n('views.connection.name'),
  icon: 'public/icon/inherit.svg',
}

const category = meta_util.name

export default {
  name: meta_util.key,
  displayName: meta_util.name,
  description: 'UI for database management',
  version,
  publisher: 'ppz',
  icon: './public/icon/ppz.png',
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
        contents: meta_util.l10n('views.connection.welcome')
      },
      {
        view: view_about.id,
        contents: meta_util.l10n('views.about.welcome')
      }
    ],
    commands: [
      {
        command: key.command.connection.add,
        title: 'add connection',
        icon: meta_util.icon('add'),
        category,
      }
    ],
  }
}
