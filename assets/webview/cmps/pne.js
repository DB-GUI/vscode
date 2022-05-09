// pne: PNE is Not Excel
import $ from '../script/ppz-query.js'

export default class PNE {
  constructor({
    className,
    editable = true,
    oninput,
    onfocus,
    color1 = 'black',
    appendStyle = true,
    fields,
    records,
  }) {
    this.className = className
    this.editable = editable
    this.oninput = oninput
    this.onfocus = onfocus
    this.color1 = color1

    this.$style = $.El('style')
    if(appendStyle)
      document.head.append(this.$style)

    this.$el = new $.Table(this._getThead(fields), this._getTbody(fields, records), className)
  }
  focused(x, y) {
    const selector = this.className ? '.' + this.className : ''
    this.$style.innerHTML = `
      ${selector} tbody tr:nth-child(${x}) {
        background-color: rgba(var(--color1, ${this.color1}), .16);
      }
      ${selector} tbody td:nth-child(${y}) {
        background-color: rgba(var(--color1, ${this.color1}), .11);
      }
      ${selector} tbody tr:nth-child(${x}) td:nth-child(${y}) {
        white-space: normal;
      }
    `
  }
  inputed($td, value) {
    if(typeof value == 'string')
      $td.innerHTML = value
    $td.style.backgroundColor = `rgba(var(--color1, ${this.color1}), .166)`
    $td.pneChanged = true
  }
  uninputed($td, resetValue = true) {
    if(resetValue)
      $td.innerHTML = $td.pneRawValue
    $td.style.backgroundColor = ''
    $td.pneChanged = false
  }

  _getThead(fields) {
    if(!fields) return []
    return fields.map(f => f.name)
  }
  _getTbody(fields, records) {
    if(!records) return []
    return records.map(
      (record, y) => 
        fields.map(
          (field, x) => {
            const rawValue = record[field.name]
            const $td = $.El('td', '', rawValue)
            $td.pneRawValue = rawValue
            if(this.editable)
              $td.contentEditable = true
            else
              $td.tabIndex = 0
            
            $td.onfocus = evt => {
              this.focused(x, y)
              if(this.onfocus)
                this.onfocus({ x, y, record, field }, evt)
            }

            $td.pneChanged = false // 上次输入，是否不同于原值
            $td.oninput = evt => {
              const value = $td.innerHTML
              const changed = value != rawValue
              const lastChanged = $td.pneChanged
              if(changed) { // 变了
                if(!lastChanged) // 上次没变
                  this.inputed($td)
              } else { // 没变
                if(lastChanged) // 上次变了
                  this.uninputed($td, false)
              }
              if(this.oninput)
                this.oninput({
                  value, changed, lastChanged,
                  x, y, record, field
                }, evt)
            }
          }
        )
    )
  }
}