// 类似于 page.js，utils.js 里也是“通用”代码，但区别在于 utils 是“业务无关”代码

export
function setOldGetNew(initValue) {
  let old = initValue
  return function(value) {
    let temp = old
    old = value
    return temp
  }
}

export
function changed(initValue) {
  let old = initValue
  return function(newValue) {
    let temp = old
    old = newValue
    return temp !== newValue
  }
}