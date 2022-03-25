const vscode = require('vscode')
const connections = require('./connections')

module.exports = function() {
  vscode.window.registerTreeDataProvider('connections', connections)
}