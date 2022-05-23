const vscode = require('vscode')
const { Type } = require('@ppzp/type')

exports.prompt = require('../lib/vscode-utils/prompt')
{ // 大括号仅用来制造块作用域
  const { confirm, warn } = require('../lib/vscode-utils/prompt/confirm')
  exports.confirm = confirm
  exports.warn = warn
}

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