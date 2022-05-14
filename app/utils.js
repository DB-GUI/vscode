const vscode = require('vscode')
const { Type } = require('@ppzp/type')

exports.prompt = require('../lib/prompt')
{ // 大括号仅用来制造块作用域
  const { confirm, warn } = require('../lib/prompt/confirm')
  exports.confirm = confirm
  exports.warn = warn
}

exports.noty = new Proxy({
  info: vscode.window.showInformationMessage,
  warn: vscode.window.showWarningMessage,
  error: vscode.window.showErrorMessage,
  fatal: msg => vscode.window.showErrorMessage('[BUG] ' + msg)
}, {
  get(target, method) {
    return msg => target[method]('[PPZ] ' + msg)
  }
})

exports.isNil =
  target => target === null || target === undefined

exports.Type = function(list) {
  return new Type(list.map(function([ name, validate, notNull ]) {
    return {
      name, validate, notNull
    }
  }))
}

exports.proto = function(father, son) {
  return Object.assign(Object.create(father), son)
}

exports.clone = function(data) {
  return JSON.parse(JSON.stringify(data))
}