const { KnexConnection, notyConnErr, TableInfo, ColumnInfo } = require('./base')
const noty = require('../../../lib/vscode-utils/noty')

class MssqlTableInfo extends TableInfo {
  constructor(name, id) {
    super(name)
    this.id = id
  }
}

module.exports =
class MSSQLKnexConnection extends KnexConnection {
  get clientName() { return 'mssql' }
  get driveName() { return 'mssql' }
  constructor({
    name, host, port, user, password, database
  }) {
    super(name, {
      server: host,
      options: {
        database,
        port,
        trustServerCertificate: true
      },
      userName: user,
      password,
      authentication: {
        type: 'default',
        options: {  
          userName: user,
          password,
        }
      }
    })
  }
  async dbList() {
    try {
      const result = await this.client.raw('SELECT * FROM sys.databases;')
      console.log({ result })
      return result.map(db => db.name)
    } catch(err) {
      notyConnErr(err)
      return []
    }
  }
  async schemaList() {
    const result = await this.client.raw('SELECT * FROM sys.schemas;')
    return result.map(row => row.name)
  }
  async tbList(schemaName) {
    const result = await this.client.raw(`select * from sys.tables where schema_name(schema_id) = '${schemaName}'`)
    return result.map(tb => new MssqlTableInfo(tb.name, tb.object_id))
  }
  async _fieldList(schemaName, tableName) {
    const oid = `object_id('${schemaName}.${tableName}')`
    const result = await this.client.raw(`
      select col.*, t.name as _type_name from sys.columns as col
      left join sys.types as t
        on col.user_type_id = t.user_type_id
      where object_id = ${oid};`)
    const pk = (await this.client.raw(`
      select * from sys.objects where type = 'PK' and parent_object_id = ${oid};
    `))[0]
    return result.map(c => new ColumnInfo(
      c.name, c._type_name, !c.is_nullable,
      'ppz-bbbbbbbbbug', // TODO
      pk && pk.object_id === c.column_id,
      null
    ))
  }
  ppzType(rawType) {
  }

  getCount(count) {
    return count[0]['']
  }

  terminal() {
    throw Error('not implemented')
  }

  async getDDL2(schema, table) {
    throw Error('not implemented')
  }
}