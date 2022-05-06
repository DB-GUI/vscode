const inputingStyle = 'background: rgba(var(--color1), .166);'

// 这种模式，仅使用闭包内的部分对象，是“使用哪些对象”变得明确
export default function TDHelperClosure($, $style, state, saveState) {
  return class TDHelper {
    constructor(record, rowIndex, field, columnIndex) {
      this.record = record
      this.rowIndex = rowIndex
      this.fieldName = field.name
      this.columnIndex = columnIndex

      this.changed = state && // state 为 null 时，表示表格不可以改变（目前是因为没有主键）
        state.find(changed => {
          for(const f in changed.pk)
            if(changed.pk[f] != record[f])
              return false
          // 没有不一样的 key，那么就是我的 state
          return true
        }).changed
      
      if(this.changed && this.changed[this.fieldName]) {
        this.$el = $.El('td', '', [this.changed[this.fieldName]])
        this.$el.style = inputingStyle
      } else {
        this.$el = $.El('td', '', [record[this.fieldName]])
      }
      this.$el.onfocus = () => this.onfocus()
      if(this.changed) {
        this.$el.contentEditable = true
        this.$el.oninput = evt => this.oninput(evt)
      } else
        this.$el.tabIndex = 0
    }
    onfocus() {
      $style.innerHTML = `
        tbody tr:nth-child(${this.rowIndex + 1}) {
          background-color: rgba(var(--color2), .188);
        }
        tbody td:nth-child(${this.columnIndex + 2}) {
          background-color: rgba(var(--color2), .188);
        }
        tbody tr:nth-child(${this.rowIndex + 1}) td:nth-child(${this.columnIndex + 2}) {
          white-space: normal;
        }
      `
    }
    oninput(evt) {
      const currentValue = this.$el.innerHTML
      if(evt.inputType == 'historyUndo' && currentValue == this.record[this.fieldName]) {
        // undo 到原始状态时
        this.$el.style = ''
        delete this.changed[this.fieldName]
      } else {
        if(this.changed[this.fieldName] == undefined) // 没变过
          this.$el.style = inputingStyle
        this.changed[this.fieldName] = currentValue
      }
      saveState()
    }
  }
}