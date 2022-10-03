import { KnexConnection, notyConnErr, TableInfo, ColumnInfo } from '../base'
import noty from '../../../../lib/vscode-utils/noty'

class MssqlTableInfo extends TableInfo {
  constructor(name, id) {
    super(name)
    this.id = id
  }
}

export default
class MSSQLKnexConnection extends KnexConnection {
  get clientName() { return 'mssql' }
  get driveName() { return 'mssql' }
  constructor({
    id, name,
    host, port, user, password, database
  }) {
    super(id, name, {
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
      select
        col.*,
        t.name as _type_name
      from sys.columns as col
      left join sys.types as t
        on col.user_type_id = t.user_type_id
      where col.object_id = ${oid};`)
    const pks = (await this.client.raw(`
      select
        col.*
      from sys.index_columns col
      left join sys.indexes ind
        on col.index_id = ind.index_id
        and col.object_id = ind.object_id
      where
        ind.is_primary_key = 1
        and col.object_id = ${oid};
    `)).map(item => item.column_id)
    return result.map(c => new ColumnInfo(
      c.name, c._type_name, !c.is_nullable,
      'ppz-bbbbbbbbbug', // TODO
      pks.indexOf(c.column_id) > -1,
      this.ppzType(c._type_name)
    ))
  }

  static ppzType(rawType) {
    if(['smalldatetime', 'datetime', 'datetime2', 'datetimeoffset'].includes(rawType))
      return 'datetime'
    else if(rawType == 'time')
      return 'time'
    else if(rawType == 'date')
      return 'date'
  }

  getCount(count) {
    return count[0]['']
  }

  terminal() {
    throw Error('not implemented')
  }

  async getDDL2(schema, table) {
    const msg = '暂不支持 mssql 系数据库导出表结构的操作'
    noty.error(msg)
    throw Error(msg)
  }
}