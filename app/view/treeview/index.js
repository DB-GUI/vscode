const vscode = require('vscode')
const connection = require('./connection')
const help = require('./help')

module.exports = function() {
  vscode.window.createTreeView('connection', connection.treeviewOptions)
  vscode.window.createTreeView('help', help)
}