const { MysqlElement } = require('./mysql')
const { Sqlite3Element } = require('./sqlite3')
const { PgsqlElement } = require('./pgsql')

module.exports = function getConEl(root, options) {
  const Klass = {
    mysql: MysqlElement,
    sqlite3: Sqlite3Element,
    postgresql: PgsqlElement,
    cockroachdb: PgsqlElement,
  }[options.client]
  if(!Klass)
    throw Error('未知的连接类型')
  return new Klass(root, options)
}