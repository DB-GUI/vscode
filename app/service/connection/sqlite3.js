const { KnexConnection, notyConnErr } = require('./base')

module.exports =
class Sqlite3KnexConnection extends KnexConnection {
  constructor({ name, filename }) {
    super('sqlite3', 'sqlite3', name, { filename }, true)
  }
  
  async tbList() {
    try {
      return (await this.client.raw('Pragma table_list'))
        .filter(tb => tb.type == 'table' && tb.schema == 'main' && tb.name.indexOf('sqlite_') != 0)
        .map(tb => tb.name)
    } catch(err) {
      notyConnErr(err)
      return []
    }
  }

  async _fieldList(schema, table) {
    return (await this.client.raw(`Pragma table_info(\`${table}\`)`))
      .map(field => ({
        name: field.name,
        type: field.type,
        notNull: Boolean(field.notnull),
        default: field.dflt_value,
        pk: Boolean(field.pk)
      }))
  }

  terminal() {
    super.terminal('sqlite3 ' + this.options.filename)
  }

  async getDDL2(schema, table) {
    const result = await this.client.raw(`select sql from sqlite_master where type="table" and name="${table}";`)
    return result[0].sql + ';\n'
  }
}
