import { Div } from '../../../../lib/dom/index.js'
import PNE from '../../../../lib/dom/pne.js'

export default function PNEWrapper(__fields, records, state, saveState) {
  let pks
  const setFields = fields => {
    __fields = fields
    pks = getPKs()
  }
  setFields(__fields)
  
  const pne = new PNE({
    fields: __fields,
    records,
    editable: editable(),
    appendStyle: false,
    oninput({ y, field, value, changed }) {
      if(changed)
        state.editing[y].changed[field.name] = value
      else
        delete state.editing[y].changed[field.name]
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
  } else {
    if(state.focus)
      pne.focused(state.focus.x, state.focus.y)
    if(editable())
      state.editing.forEach(
        ({ changed }, y) => {
          __fields.forEach(
            (f, x) => {
              if(changed[f.name] !== undefined) {
                const $td = pne.table.tbody().children[y].children[x]
                $td.pneChanged = true
                pne.inputed($td, changed[f.name])
              }
            }
          )
        }
      )
  }

  function getPKs() {
    return __fields.filter(f => f.pk).map(f => f.name)
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
      this.reset()
    },
    reset() {
      state = initState()
      saveState(state)
      pne.thead(__fields)
      pne.tbody(__fields, records)
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