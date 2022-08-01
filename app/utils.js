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

const format = target => {
  if(isNaN(target))
    target = 0
  return target < 10
    ? '0' + target
    : target
}
exports.formatDate = function(date) {
  const year = date.getFullYear() || '0000'
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  let ms = date.getMilliseconds()
  if(isNaN(ms))
    ms = 0
  ms = (ms + '').padStart(3, '0')
  return `${format(year)}-${format(month)}-${format(day)
    } ${format(hours)}:${format(minutes)}:${format(seconds)
    }.${ms}`
}