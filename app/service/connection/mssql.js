const { KnexConnection, notyConnErr, TableInfo } = require('./base')
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
    throw Error('not implemented')
  }
  ppzType(rawType) {
  }

  getCount(count) {
    throw Error('not implemented')
  }

  terminal() {
    throw Error('not implemented')
  }

  async getDDL2(schema, table) {
    throw Error('not implemented')
  }
}