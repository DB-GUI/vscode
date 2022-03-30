import $ from '../script/ppz-query.js'

const checkbox = Symbol('checkbox')

export default function Checkbox(label, checked, title) {
  this[checkbox] = $.El('input')
  this[checkbox].type = 'checkbox'
  this[checkbox].checked = checked ? 'checked' : ''
  this.$el = $.El('label', 'checkbox', [
    this[checkbox],
    $.El('span', '', label)
  ])
  if(title)
    this.$el.title = title
}

Checkbox.prototype = {
  checked() {
    return this[checkbox].checked
  },
  check() {
    this[checkbox].checked = 'checked'
  },
  uncheck() {
    this[checkbox].checked = ''
  },
  toggle() {
    this[checkbox].checked = this.checked()
    ? '' : 'checked'
  }
}