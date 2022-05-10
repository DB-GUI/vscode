import PNE from '../../cmps/pne.js'
import $ from '../../script/ppz-query.js'

export default function PNEWrapper(__fields, records, state, saveState) {
  let pks = getPKs()
  const setFields = fields => {
    __fields = fields
    pks = getPKs()
  }
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
    onfocus({ x, y }) {
      state.focus = { x, y }
      saveState()
    }
  })

  if(!state) {
    state = initState()
    saveState(state)
  } else {
    if(state.focus)
      pne.focused(state.focus.x, state.focus.y)
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
    $el: $.Div('table-wrapper', [pne.$el, pne.$style]),
    updateData(_fields, _records) {
      setFields(_fields)
      records = _records
      state = initState()
      saveState(state)
      pne.$style.innerHTML = ''
    },
    isEditing() {
      return editable() && state.editing.some(
        item => Object.entries(item.changed).length
      )
    }
  }
}