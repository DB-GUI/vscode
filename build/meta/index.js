const FS = require('fs')
const { version } = require('../../package.json')

module.exports = function make_package_json() {
  const result = {
    name: 'ppz',
    displayName: 'PPz',
    description: 'UI for database management',
    version,
    publisher: 'ppz',
    icon: './icon.png',
    main: './main.js',
    engines: {
      vscode: '^1.47.3'
    },
    activationEvents: [
      'onStartupFinished'
    ]
  }
  FS.writeFileSync('dist/package.json', JSON.stringify(result, null, 2))
  FS.copyFileSync('doc/CHANGELOG.md', 'dist/CHANGELOG.md')
  FS.copyFileSync('README.md', 'dist/README.md')
  FS.copyFileSync('LICENSE', 'dist/LICENSE')
}
