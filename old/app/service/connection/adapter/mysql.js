import { KnexConnection, TableInfo, ColumnInfo, notyConnErr } from '../base'
import {
  dateType,
  dateTimeType0, dateTimeType1, dateTimeType2, dateTimeType3,
} from '../type'

export default
class MysqlKnexConnection extends KnexConnection {
  get clientName() { return 'mysql' }
  get driveName() { return 'mysql2' }
  constructor({
    id, name,
    useUrl, url,
    host, port, user, password, database
  }) {
    super(id, name, 
      useUrl && url
      || {
        multipleStatements: true,
        host, port, user, password, database
      }
    )
  }
  async dbList() {
    try {
      const result = await this.client.raw('show databases;')
      return result[0].map(item => item.Database)
    } catch(err) {
      notyConnErr(err)
      return []
    }
  }
  async tbList(schema) {
    await this.client.raw('use `' + schema + '`')
    const result = await this.client.raw('show tables;')
    return result[0].map(item => new TableInfo(item['Tables_in_' + schema]))
  }
  
  async _fieldList(schema, table) {
    const result = await this.client.raw(`desc \`${schema}\`.\`${table}\``)
    return result[0].map(field => new ColumnInfo(
      field.Field,
      field.Type,
      field.Null == 'NO',
      field.Default,
      field.Key == 'PRI',
      this.constructor.ppzType(field.Type)
    ))
  }

  static ppzType(rawType) {
    switch(rawType) {
      case 'datetime':
      case 'timestamp':
        return dateTimeType0
      case 'date':
        return dateType
      // case 'time': // 被当作字符串
      case 'datetime(1)': case 'timestamp(1)':
        return dateTimeType1
      case 'datetime(2)': case 'timestamp(2)':
        return dateTimeType2
      case 'datetime(3)': case 'timestamp(3)':
      case 'datetime(4)': case 'timestamp(4)':
      case 'datetime(5)': case 'timestamp(5)':
      case 'datetime(6)': case 'timestamp(6)':
        return dateTimeType3
    }
  }

  terminal() {
    super.terminal(`mysql -h${this.options.host}${
      this.options.port ? ':' + this.options.port : ''
    } -u${this.options.user} -p${this.options.password}`)
  }

  // Data Definition Language
  async getDDL2(schema, table) {
    const res = await this.client.raw(`show create table ${this.getTarget(schema, table)}`)
    return res[0][0]['Create Table'] + ';\n'
  }
}