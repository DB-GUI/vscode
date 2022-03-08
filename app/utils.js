const vscode = require('vscode')

exports.noty =
  msg => vscode.window.showInformationMessage(msg)