const { KnexConnection, notyConnErr } = require('./base')

module.exports =
class MysqlKnexConnection extends KnexConnection {
  constructor({
    useUrl, url,
    name, host, port, user, password, database
  }) {
    super('mysql', 'mysql2', name, 
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
    return result[0].map(item => item['Tables_in_' + schema])
  }
  
  async _fieldList(schema, table) {
    const result = await this.client.raw(`desc \`${schema}\`.\`${table}\``)
    return result[0].map(field => ({
      name: field.Field,
      type: field.Type,
      ppzType: this.ppzType(field.Type), // 便于格式化显示/解析
      notNull: field.Null == 'NO',
      default: field.Default,
      pk: field.Key == 'PRI'
    }))
  }
  ppzType(rawType) {
    if(
      (['date', 'datetime', 'timestamp'].indexOf(rawType) > -1)
      || /datetime\(\d*\)/.test(rawType)
      || /timestamp\(\d*\)/.test(rawType)
    )
      return 'datetime'
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