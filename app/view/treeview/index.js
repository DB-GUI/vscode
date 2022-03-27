const vscode = require('vscode')
const connection = require('./connection')

module.exports = function() {
  vscode.window.registerTreeDataProvider('connection', connection.provider)
}