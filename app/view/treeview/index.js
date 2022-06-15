const vscode = require('vscode')
const connection = require('./connection')

module.exports = function() {
  vscode.window.createTreeView('connection', connection.options)
}