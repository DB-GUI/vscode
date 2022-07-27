const { MysqlElement } = require('./mysql')
const { Sqlite3Element } = require('./sqlite3')
const { PgsqlElement } = require('./pgsql')
const { MssqlElement } = require('./mssql')

module.exports = function getConEl(root, options) {
  // PPZ_ADAPTER
  const Klass = {
    mysql: MysqlElement,
    sqlite3: Sqlite3Element,
    postgresql: PgsqlElement,
    cockroachdb: PgsqlElement,
    mssql: MssqlElement,
  }[options.client]
  if(!Klass)
    throw Error('未知的连接类型')
  return new Klass(root, options)
}