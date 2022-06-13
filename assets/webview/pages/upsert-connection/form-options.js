export default function FormOptions(editing) {
  return {
    current: editing? editing.client : 'mysql',
    publicForm: {
      name: editing ? editing.name : '未命名连接',
    },
    forms: [
      Form('mysql', 'MySQL', [
        Field('host', true),
        Field('port'),
        Field('user', true),
        Field('password', true),
        Field('database', true),
      ]),
      Form('sqlite3', 'SQLite3', [
        FileField('filename', true)
      ]),
      Form('postgresql', 'PostgreSQL', [
        Field('host', true),
        Field('port'),
        Field('user', true),
        Field('password', true),
        Field('database', true),
      ])
    ]
  }

  function Form(key, label, fields) {
    if(editing && editing.client == key)
      for(const field of fields)
        field.value = editing[field.name]
    return {
      key, label, fields
    }
  }
}

function FileField(name, required, value) {
  const result = Field(name, required, value)
  result.type = 'file'
  return result
}

function Field(name, required = false, value = '') {
  return {
    name, required, value
  }
}
