const { TreeviewElement, TableElement } = require('../base')
const ConnectionElement = require('./base')

class MysqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(dbName => new MysqlSchemaElement(this, dbName))
  }
}
exports.MysqlElement = MysqlElement

class MysqlSchemaElement extends TreeviewElement {
  get isSchema() { return true }
  get connection() { return this.parent.connection }

  constructor(connectionElement, dbName) {
    super({
      parent: connectionElement,
      name: dbName,
      contextValue: 'mysqlSchema'
    })
  }
  async _getChildren() {
    const tbList = await this.parent.connection.tbList(this.name)
    return tbList.map(name => new TableElement(this, this.name, name,
      [this.parent.name, this.name, name],
      this.parent.connection
    ))
  }
}
exports.MysqlSchemaElement = MysqlSchemaElement