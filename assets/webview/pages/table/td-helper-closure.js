const inputingStyle = 'background: rgba(var(--color1), .166);'

export default function TDHelperClosure($, $style, changing) {
  return class TDHelper {
    constructor(record, rowIndex, field, columnIndex) {
      this.rowIndex = rowIndex
      this.columnIndex = columnIndex
      this.rawValue = record[field.name]
      this.$el = $.El('td', '', [this.rawValue])
      // td.tabIndex = 0 // 有 contentEditable 就可以了
      this.$el.contentEditable = true
      this.$el.onfocus = () => this.onfocus()
      this.$el.oninput = () => this.oninput()
    }
    onfocus() {
      $style.innerHTML = `
        tbody tr:nth-child(${this.rowIndex + 1}) {
          background-color: rgba(var(--color2), .188);
        }
        tbody td:nth-child(${this.columnIndex + 2}) {
          background-color: rgba(var(--color2), .188);
        }
      `
    }
    oninput() {
      if(changing.has(this)) return
      changing.add(this)
      this.$el.style = inputingStyle
    }
  }
}