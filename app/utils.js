const vscode = require('vscode')
const { Type } = require('@ppzp/type')

exports.noty = {
  info: vscode.window.showInformationMessage,
  warn: vscode.window.showWarningMessage,
  error: vscode.window.showErrorMessage
}

exports.isNil =
  target => target == null || target == undefined

exports.Type = function(list) {
  return new Type(list.map(function([ name, notNull, validate ]) {
    if(exports.isNil(validate)) {
      validate = notNull
      notNull = undefined
    }
    return {
      name, validate, notNull
    }
  }))
}

exports.proto = function(father, son) {
  return Object.assign(Object.create(father), son)
}