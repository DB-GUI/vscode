import { KnexConnection, TableInfo, ColumnInfo, notyConnErr } from '../base'
import noty from '../../../../lib/vscode-utils/noty'

export default
class PostgreSQLKnexConnection extends KnexConnection {
  get clientName() { return 'postgresql' }
  get driveName() { return 'pg' }
  constructor({
    id, name,
    useUrl, url,
    host, port, user, password, database
  }) {
    super(id, name,
      useUrl && {
        connectionString: url
      }
      || {
        host, port, user, password, database
      }
    )
  }
  async dbList() {
    try {
      const result = await this.client.raw('SELECT datname FROM pg_database WHERE datistemplate=false;')
      return result.rows.map(db => db.datname)
    } catch(err) {
      notyConnErr(err)
      return []
    }
  }
  async schemaList() {
    const result = await this.client.raw('select schema_name from information_schema.schemata;')
    return result.rows.map(row => row.schema_name)
  }
  async tbList(schemaName) {
    const result = await this.client.raw(`SELECT table_name FROM information_schema.tables WHERE table_schema='${schemaName}';`)
    return result.rows.map(db => new TableInfo(db.table_name))
  }
  async _fieldList(schemaName, tableName) {
    const result = await this.client.raw(`SELECT * FROM information_schema.COLUMNS WHERE table_schema='${schemaName}' and table_name='${tableName}';`)
    const pks = await this.client.raw(`SELECT a.attname
      FROM   pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE  i.indrelid = '${schemaName}.${tableName}'::regclass AND i.indisprimary;`)
    const pkNames = pks.rows.map(row => row.attname)
    return result.rows.map(field => new ColumnInfo(
      field.column_name,
      field.udt_name,
      !Boolean(field.is_nullable),
      field.column_default,
      pkNames.indexOf(field.column_name) != -1,
      this.ppzType(field.udt_name)
    ))
  }
  static ppzType(rawType) {
    if(
      (['date', 'timestamp'].indexOf(rawType) > -1)
      || /timestamp\(\d*\)/.test(rawType)
    )
      return 'datetime'
    else if(
      'timestamptz' == rawType
      || /timestamptz\(\d*\)/.test(rawType)
    )
      return 'datetime-ts'
  }

  getCount(count) {
    return parseInt(count[0]['count'])
  }

  terminal() {
    let cmd = `psql -h ${this.options.host} -U ${this.options.user}`
    if(this.options.port)
      cmd += ' -p ' + this.options.port
    if(this.options.database)
      cmd += ' -d ' + this.options.database
    
    super.terminal(cmd)
  }

  async getDDL2(schema, table) {
    const msg = '暂不支持 pgsql 系数据库导出表结构的操作'
    noty.error(msg)
    throw Error(msg)
  }
}