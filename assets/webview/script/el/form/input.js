import { El } from '../index.js'

/* 双向绑定要处理的问题：
 * 1. state 变化时：更新 input；触发 onChange
 * 2. input 里值的更新时：反馈到 state；触发 onChange
 * 其中，onChange 不能重复触发
 * 实现：
 * 1. 监听 state 的 set（来自开发者）：更新 state、更新 input、触发 onChange
 * 2. 监听 input（来自页面使用者）：更新 state、触发 onChange
 * 不应实现：
 *   不应监听 开发者通过代码直接对 input.value 进行的修改
 */

export
class Input {
  constructor(key, data, elOptions) {
    this._changeListener = []
    this._key = key
    this.init(data, false)
    this.$el = this.getEl(elOptions)
  }
  
  init(data, emitChange = true) {
    const value = data[this._key]
    this._value = value
    Object.defineProperty(data, this._key, {
      enumerable: true,
      get: () => this._value,
      set: value => {
        if(this.formatValue)
          value = this.formatValue(values)
        this._value = value
        this._setInput()
        this._emitChange(value)
      }
    })
    this._setInput()
    if(emitChange)
      this._emitChange(value)
  }
  _setInput() {
    this.$el.value = this._value
  }

  getEl() {} // 创建 el；监听 el 值的改变（改变 this._value；_onChange）
  // reset() {} 通过 data[key] = undefined 来触发

  // 添加监听
  onChange(listener) {
    this._changeListener.push(listener)
  }
  // 触发监听
  _emitChange(value) { // 传入 value 的目的在于，保证 value 变动时的原始值
    this._changeListener.forEach(h => h(value))
  }
}

export
class TextInput extends Input {
  getEl() {
    const $el = El('input')
    $el.oninput = e => {
      this._value = e.target.value
      this._onChange(e.target.value)
    }
    return $el
  }
  formatValue(value) {
    return isNil(value)? '':value
  }
}

export
class SelectInput extends Input {
  getEl(options) {
    const $el = El('select', null, options.map(option => {
      const $option = El('option', null, [option.label])  
      $option.value = option.value
      return $option
    }))
    $el.onchange = e => {
      this._value = e.target.value
      this._onChange(e.target.value)
    }
    return $el
  }
}

function isNil(target) {
  return target === null || target === undefined
}