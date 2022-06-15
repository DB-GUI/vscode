import { Div } from '../../../../lib/dom/index.js'
import PNE from '../../../../lib/dom/pne.js'
import { changed } from '../../script/utils.js'

export default function PNEWrapper(page, __fields, records, state, saveState) {
  let pks
  const setFields = fields => {
    __fields = fields.map(f => ({
      key: f.name,
      label: f.name,
      title: f.type,
      show: f.show
    }))
    pks = fields.filter(f => f.pk).map(f => f.name)
  }
  setFields(__fields)
  
  // 在 noState（新打开页面）和 updateData（更新数据）时检测
  const checkUneditable = new function() {
    const editableChanged = changed()
    return function() {
      const _e = editable()
      if(!_e && editableChanged(_e)) // 不能编辑 && 变了
        page.noty.info(PPZ.initData.names[PPZ.initData.names.length - 1] + ' 表没有主键，而不能修改、删除记录')
    }
  }

  const pne = new PNE({
    fields: __fields,
    records,
    editable: editable(),
    appendStyle: false,
    oninput({ y, field, value, changed }) {
      if(changed)
        state.editing[y].changed[field.key] = value
      else
        delete state.editing[y].changed[field.key]
      saveState()
    },
    onfocus({ x, y, record }) {
      const pkValue = {}
      for(const pk of pks)
        pkValue[pk] = record[pk]
      state.focus = { x, y, record, pkValue }
      saveState()
    }
  })

  if(!state) {
    state = initState()
    saveState(state)
    checkUneditable()
  } else {
    if(state.focus)
      pne.focused(state.focus.x, state.focus.y)
    if(editable())
      state.editing.forEach(
        ({ changed }, y) => {
          __fields.forEach(
            (f, x) => {
              if(changed[f.key] !== undefined) {
                const $td = pne.table.tbody().children[y].children[x]
                $td.pneChanged = true
                pne.inputed($td, changed[f.key])
              }
            }
          )
        }
      )
  }

  function editable() {
    return pks.length > 0
  }
  function initState() {
    const result = {
      focus: null
    }
    if(editable())
      result.editing = records.map(record => ({
        pk: Object.fromEntries(pks.map(pk => [pk, record[pk]])),
        changed: {}
      }))
    return result
  }

  return {
    $el: Div('table-wrapper', [pne.$el, pne.$style]),
    updateData(_fields, _records) {
      setFields(_fields)
      records = _records
      pne.editable = editable()
      checkUneditable()
      this.reset()
    },
    reset() {
      state = initState()
      saveState(state)
      this.render()
    },
    render(fields) {
      if(fields)
        setFields(fields)
      pne.thead(__fields)
      pne.tbody(records, __fields)
      pne.$style.innerHTML = ''
    },
    pks: () => pks,
    editable,
    isEditing() {
      return editable() && state.editing.some(
        item => Object.entries(item.changed).length
      )
    },
    getEditing() {
      // null: 不可编辑；[]: 未编辑；others: 正在编辑
      if(!editable()) return null
      return state.editing.filter(
        record => Object.entries(record.changed).length
      )
    }
  }
}