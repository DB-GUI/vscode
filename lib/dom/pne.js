// pne: PNE is Not Excel
import { El, Table } from './index.js'

let pneIndex = 0
// 明确一个组件如何“初始化状态”非常重要（状态不包括配置信息，也就是“不会变的状态”）
export default class PNE {
  constructor({
    fields,
    records,
    editable = true,
    color1 = 'black',
    appendStyle = true,
    oninput,
    onfocus
  }) {
    this.pneIndex = pneIndex ++
    this.editable = editable
    this.oninput = oninput
    this.onfocus = onfocus
    this.color1 = color1

    this.$style = El('style')
    if(appendStyle)
      document.head.append(this.$style)

    this.table = new Table(fields, this._getTbody(records, fields))
    this.$el = this.table.$el
    this.$el.className = `pne pne${this.pneIndex}`
  }
  focused(x, y) {
    x += 1
    y += 1
    const selector = '.pne' + this.pneIndex
    this.$style.innerHTML = `
      ${selector} tbody tr:nth-child(${y}) {
        background-color: rgba(var(--color1, ${this.color1}), .16);
      }
      ${selector} tr > *:nth-child(${x}) {
        background-color: rgba(var(--color1, ${this.color1}), .11);
      }
      ${selector} tbody tr:nth-child(${y}) td:nth-child(${x}) {
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

  thead(fields) {
    return this.table.thead(fields)
  }
  tbody(records, fields) {
    return this.table.tbody(this._getTbody(records, fields), fields)
  }
  _getTbody(records, fields) {
    return records.map(
      (record, y) => {
        const row = {}
        fields.forEach(
          (field, x) => {
            const rawValue = record[field.key]
            const $td = El('td', [rawValue])
            $td.title = field.key
            if(field.show === false)
              $td.style.display = 'none'
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
            row[field.key] = $td
          }
        )
        return row
      }
    )
  }
}