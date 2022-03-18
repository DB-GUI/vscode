const vscode = require('vscode')

exports.noty =
  msg => vscode.window.showInformationMessage(msg)

exports.isNil =
  target => target == null || target == undefined