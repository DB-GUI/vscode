import { TreeviewElement, TableElement } from '../base'
import ConnectionElement from './base'

export
class MysqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(dbName => new MysqlSchemaElement(this, dbName))
  }
}

export
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
    return tbList.map(tb => new TableElement(this, this.name, tb.name,
      [this.parent.name, this.name, tb.name],
      this.parent.connection
    ))
  }
}