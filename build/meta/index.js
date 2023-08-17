const FS = require('fs')
const { version } = require('../../package.json')
const contributes = require('./contribution')
const l10n = require('./l10n')

module.exports = function make_package_json() {
  const result = {
    name: 'ppz',
    displayName: 'PPz',
    description: 'UI for database management',
    version,
    publisher: 'ppz',
    icon: './asset/icon/ppz.svg',
    main: './main.js',
    engines: {
      vscode: '^1.47.3'
    },
    activationEvents: [
      'onStartupFinished'
    ],
    contributes
  }
  l10n()
  FS.writeFileSync('dist/package.json', JSON.stringify(result, null, 2))
  FS.cpSync('src/asset', 'dist/asset', {
    recursive: true
  })
  FS.copyFileSync('doc/CHANGELOG.md', 'dist/CHANGELOG.md')
  FS.copyFileSync('README.md', 'dist/README.md')
  FS.copyFileSync('LICENSE', 'dist/LICENSE')
}
