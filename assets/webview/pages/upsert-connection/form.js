import $ from '../../script/ppz-query.js'

const publicFields = [
  { name: 'name' }
]

const formsOptions = [ // pivateFields
  {
    client: 'mysql',
    label: 'MySQL',
    fields: [
      { name: 'host', required: true },
      { name: 'port' },
      { name: 'user', required: true },
      { name: 'password', required: true },
      { name: 'database' }
    ]
  }, {
    client: 'sqlite3',
    label: 'SQLite3',
    fields: [
      { name: 'filepath', required: true, file: true }
    ]
  }, {
    client: 'postgresql',
    label: 'PostgreSQL',
    fields: [
    ]
  },
]

export function initState(initData) {
  return {
    current: 0,
    public: {},
    data: formsOptions.map(options => ({
      client: options.client
    }))
  }
}

export function Forms(state, saveState) {
  const forms = formsOptions.map((options, index) => {
    const $btn = $.Button([options.label], () => {
      if(state.current == index) return // 重复选
      // 原来的，unselect
      forms[state.current].$btn.classList.remove('selected')
      forms[state.current].$form.classList.remove('selected')
      // 新的，select
      state.current = index
      saveState()
      $btn.classList.add('selected')
      $form.classList.add('selected')
    })
    const privateForm = new $.Form(state.data[index], formsOptions[index].fields)
    privateForm.onChange(saveState)
    const $form = $.Div(
      'private form',
      privateForm.$elList
    )
    if(index == state.current) {
      $btn.classList.add('selected')
      $form.classList.add('selected')
    }
    return { $btn, $form }
  })
  const publicForm = new $.Form(state.public, publicFields)
  publicForm.onChange(saveState)
  return $.Div('form-container', [
    $.Div('client-selector', forms.map(form => form.$btn)),
    $.Div('forms', [
      $.Div('public form', publicForm.$elList),
      $.Div(null, forms.map(form => form.$form))
    ])
  ])
}

export function getData(state) {
  const current = state.data[state.current]
  const data = Object.assign({}, current, state.public)
  return data
}