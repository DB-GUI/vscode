import { version } from '../../package.json'
import commands from 'src/command/all'
import { meta_util } from 'src/util'

const container_view = {
  id: 'ppz_view_container',
  title: 'PPz View',
  icon: 'asset/icon/inherit.svg'
}
const view_about = {
  id: meta_util.key_and('.about'),
  name: meta_util.l10n('views.about.name'),
  icon: 'asset/icon/inherit.svg',
}
const view_connection = {
  id: meta_util.key_and('.connection'),
  name: meta_util.l10n('views.connection.name'),
  icon: 'asset/icon/inherit.svg',
}

export default {
  name: meta_util.key,
  displayName: meta_util.name,
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
        contents: meta_util.l10n('views.connection.welcome')
      },
      {
        view: view_about.id,
        contents: meta_util.l10n('views.about.welcome')
      }
    ],
    commands: commands.map(({ register }) => register),
  }
}
