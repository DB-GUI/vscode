export
function $(selector) {
  return document.querySelector(selector)
}

export
function El(tagname, children) {
  const $el = document.createElement(tagname)
  if(children)
    $el.append(...children)
  return $el
}

export
function Section(children) {
  return El('section', children)
}
export
function Div(className, children) {
  if(className instanceof Array) {
    children = className
    className = undefined
  }
  const $el = El('div', children)
  if(className)
    $el.className = className
  return $el
}
export
function Span(txt) {
  return El('span', [txt])
}
export
function Button(labels, onclick) {
  const button = El('button', labels)
  button.onclick = onclick
  return button
}
export
function Input(options) {
  const $el = El('input')
  for(const key in options)
    $el[key] = options[key]
  return $el
}

export
class Checkbox {
  constructor(label, options = {}) {
    options.type = 'checkbox'
    if(options.onchange)
      options.onchange = options.onchange.bind(this)
    this.$checkbox = Input(options)
    this.$el = El('label', [
      this.$checkbox,
      label
    ])
    this.$el.className = 'checkbox'
  }
  get value() {
    return this.$checkbox.checked
  }
  set value(value) {
    this.$checkbox.checked = value
  }
  toggle() {
    this.$checkbox.checked = !this.$checkbox.checked
  }
}

let radioIndex = 1
export
class RadioGroup {
  constructor(options, {
    name = 'ppz-radio-' + radioIndex++,
    defaultValue,
    onChange
  } = {}) {
    this.$radios = []
    this.listeners = []
    if(onChange)
      this.listeners.push(onChange)
    this.$el = Div('', options.map(option => {
      const $radio = El('input')
      $radio.type = 'radio'
      $radio.name = name
      $radio.value = option.value
      $radio.onchange = () => {
        if($radio.checked)
          this._emitChange($radio.value)
      }
      if(option.value == defaultValue)
        $radio.checked = true
      this.$radios.push($radio)
      return El('label', '', [
        $radio,
        Span('', option.label)
      ])
    }))
  }
  get value() {
    const checked = this.$radios.find($radio => $radio.checked)
    return checked ? checked.value : undefined
  }
  set value(v) {
    for(const $radio of this.$radios)
      if($radio.value == v) {
        $radio.checked = true
        return
      }
    throw Error('invalid radio value')
  }
  onChange(cb) {
    this.listeners.push(cb)
  }
  _emitChange(value) {
    for(const listener of this.listeners)
      setTimeout(() => listener(value))
  }
}

export  
class Form {
  constructor(data, fields) {
    this.data = data
    this.fields = fields
    this.inputs = {}
    this.$elList = fields.map(field => {
      const input = new (field.Input || Form.TextInput)(field.name, data, field.options)
      this.inputs[field.name] = input
      const $el = El(
        'label',
        [
          Span(field.label || field.name),
          input.$el
        ]
      )
      if(field.required)
        $el.className = 'required'
      return $el
    })
  }
  init(data) {
    this.data = data
    for(const f of this.fields)
      this.inputs[f.name].init(data)
  }
  onChange(handle) {
    for(const name in this.inputs)
      this.inputs[name].onChange(value => handle(value, name))
  }
}
Form.Input = class Input {
  constructor(key, data, elOptions) {
    this._changeListener = []
    this.$el = this.getEl(elOptions)
    this._key = key
    this.init(data, false)
  }
  
  init(data, emitChange = true) {
    this._value = this.formatValue(data[this._key])
    Object.defineProperty(data, this._key, {
      enumerable: true,
      get: () => this._value,
      set: value => {
        value = this.formatValue(value)
        this._value = value
        this._setInput()
        this._emitChange()
      }
    })
    this._setInput()
    if(emitChange)
      this._emitChange()
  }
  _setInput() {
    this.$el.value = this._value
  }

  formatValue(value) {
    return isNil(value)? '':value
  }

  getEl() {} // 创建 el；监听 el 值的改变（改变 this._value；_onChange）
  // reset() {} 通过 data[key] = undefined 来触发

  // 添加监听
  onChange(listener) {
    this._changeListener.push(listener)
  }
  // 触发监听
  _emitChange() {
    const value = this._value // 保证 value 变动时的原始值（不被监听器里的代码影响）
    this._changeListener.forEach(h => h(value))
  }
}
Form.TextInput = class TextInput extends Form.Input {
  getEl() {
    const $el = El('input')
    $el.oninput = e => {
      this._value = e.target.value
      this._emitChange()
    }
    return $el
  }
}
Form.SelectInput = class SelectInput extends Form.Input {
  getEl(options) {
    const $el = El('select', options.map(option => {
      const $option = El('option', [option.label])  
      $option.value = option.value
      return $option
    }))
    $el.onchange = e => {
      this._value = e.target.value
      this._emitChange()
    }
    return $el
  }
}

export
class Table {
  constructor(fields, records) {
    this.$el = El('table', [
      Table.Head(fields),
      Table.Body(records, fields)
    ])
  }
  tbody(records, fields) {
    const current = this.$el.querySelector('tbody')
    if(records) {
      const newDom = Table.Body(records, fields)
      current.replaceWith(newDom)
      return newDom
    } else {
      return current
    }
  }
  thead(fields) {
    const current = this.$el.querySelector('thead')
    if(fields) {
      const newDom = Table.Head(fields)
      current.replaceWith(newDom)
      return newDom
    } else {
      return current
    }
  }
}
Table.Head = function THead(fields) {
  return El('thead', [
    El('tr', fields.map(field =>
      field instanceof HTMLTableCellElement
        ? field
        : new function() {
          const $th = El('th', [field.label])
          if(field.title)
            $th.title = field.title
          if(field.show === false)
            $th.style.display = 'none'
          return $th
        }
    ))
  ])
}
Table.Body = function TBody(records, fields) {
  return El('tbody', 
    records.map(record =>
      El('tr', fields.map(field => {
        const td = record[field.key]
        if(td instanceof HTMLTableCellElement)
          return td
        const $td = El('td', td.label)
        if(field.label)
          $td.title = field.label
        if(field.show === false)
          $td.style.display = 'none'
        return $td
      }))
    )
  )
}

export
function Dialog(children) {
  return El('dialog', children)
}

export
const isNil = target => target === undefined || target === null