export default function $(selector) {
  if(typeof selector == 'string')
    return document.querySelector(selector)
  return selector
}

$.clone = function(data) {
  const result = {}
  for(let k in data)
    result[k] = data[k]
  return result
}

$.isNil = function(target) {
  if(target == null || target == undefined)
    return true
  return false
}

import twb from './two-way-data-binding.js'
$.twb = twb
