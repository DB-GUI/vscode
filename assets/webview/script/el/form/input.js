import { El, Span } from '../index.js'

/* 双向绑定要处理的问题：
 * 1. state 变化时：更新 input；触发 onChange
 * 2. input 里值的更新时：反馈到 state；触发 onChange
 * 其中，onChange 不能重复触发
 * 实现：
 * 1. 监听 state 的 set：更新 state、更新 input、触发 onChange
 * 2. 监听 input：更新 state、触发 onChange
 */

class Input {
  constructor(field, data, getElOptions) {
    this._key = field.name
    this._changeListener = []
    this.$el = this.getEl(getElOptions)
    this.init(data, true)
  }
  
  init(data, constructing) {
    const value = data[this._key]
    this._value = value
    Object.defineProperty(data, this._key, {
      enumerable: true,
      get: () => this._value,
      set: value => {
        this._value = value
        this.setInput(value)
        this._onChange(value)
      }
    })
    this.setInput(value)
    if(!constructing)
      this._onChange(value)
  }

  getEl() {} // 创建 el；监听 el 值的改变（改变 this._value；_onChange）
  // reset() {} 通过 data[key] = undefined 来触发

  setInput(value) { // 传入 value 的目的在于，对外隐藏 this._value
    this.$el.value = value
  }

  // 添加监听
  onChange(listener) {
    this._changeListener.push(listener)
  }
  // 触发监听
  _onChange(value) { // 传入 value 的目的在于，保证 value 变动时的原始值
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
  setInput(value) {
    super.setInput(isNil(value)? '' : value)
  }
}

export
class SelectInput extends Input {
  constructor(field, data) {
    super(field, data, field.options)
  }

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

export
class FileInput extends Input {
  getEl() {
  }
  setInput(value) {

  }
}

function isNil(target) {
  return target == null || target == undefined
}