import { KnexConnection, notyConnErr, TableInfo, ColumnInfo } from '../base'
import noty from '../../../../lib/vscode-utils/noty'
import {
  dateTimeType0, dateTimeType1, dateTimeType2, dateTimeType3,
  dateType, smallDateTimeType,
  timeType0, timeType1, timeType2, timeType3
} from '../type'

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
        useUTC: false,
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
      this.constructor.ppzType(c._type_name, c.scale)
    ))
  }

  static ppzType(rawType, scale) {
    switch(rawType) {
      case 'date':
        return dateType
      case 'datetime': // 3 位
        return dateTimeType3
      case 'datetime2':
      case 'datetimeoffset':
        switch(scale) {
          case 0:
            return dateTimeType0
          case 1:
            return dateTimeType1
          case 2:
            return dateTimeType2
          case 3: case 4: case 5: case 6: case 7:
            return dateTimeType3
          default:
            throw Error('精度 scale 未识别')
        }
      case 'smalldatetime':
        return smallDateTimeType
      case 'time':
        switch(scale) {
          case 0:
            return timeType0
          case 1:
            return timeType1
          case 2:
            return timeType2
          case 3: case 4: case 5: case 6: case 7:
            return timeType3
        }
    }
  }

  formatInput(records) {
    super.formatInput(records)
    const offsetFields = this.fields.filter(f => f.type == 'datetimeoffset')
    const offset = new Date().getTimezoneOffset() * 60 * 1000
    for(let record of records)
      for(let f of offsetFields)
        if(record[f.name] instanceof Date)
          record[f.name] = new Date(record[f.name].getTime() + offset)
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