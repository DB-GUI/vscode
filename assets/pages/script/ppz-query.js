/** @returns {HTMLElement} */
export default function $(selector) {
  if(typeof selector == 'string')
    return document.querySelector(selector)
  return selector
}

$.El = function(tagname, className, children) {
  /** @type {HTMLElement} */
  const $el = document.createElement(tagname)
  if(className)
    $el.className = className
  if(children)
    $el.append(...children)
  return $el
}

$.clone = function(data) {
  const result = {}
  for(let k in data)
    result[k] = data[k]
  return result
}

// 可优化
$.msg = function(messageType, handler) {
  window.addEventListener('message', function({ data: { type, data }}) {
    if(messageType == type) {
      console.debug('收到消息', type, data)
      handler(data)
    }
  })
}

$.isNil = function(target) {
  if(target == null || target == undefined)
    return true
  return false
}