const { TreeviewElement, TableElement } = require('../base')
const connectionService = require('../../../../../service/connection')
const ConnectionElement = require('./base')

class PgsqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(name => new PgsqlDatabaseElement(this, name, this.options.database == name))
  }
  close() {
    super.close()
    this.closeChildren()
  }
  closeChildren() {
    if(this._children)
      for(const db of this._children)
        db.close()
  }
  refresh() {
    this.closeChildren()
    super.refresh()
  }
}
exports.PgsqlElement = PgsqlElement

class PgsqlDatabaseElement extends TreeviewElement {
  constructor(connEl, dbName, isDefault) {
    super({
      parent: connEl,
      name: dbName,
      contextValue: 'pgDatabase'
    })
    this.isDefault = isDefault
  }
  async _getChildren() {
    const schemaList = await this.connection.schemaList()
    return schemaList.map(schemaName => new PgsqlSchemaElement(this, schemaName))
  }
  get connection() {
    if(this.isDefault)
      return this.parent.connection
    if(!this._connection)
      this._connection = connectionService.connect(Object.assign({}, this.parent.options, {
        database: this.name
      }))
    return this._connection
  }

  close() {
    if(this._connection)
      this._connection.close()
  }
  
  terminal() {
    this.connection.terminal()
  }
}
class PgsqlSchemaElement extends TreeviewElement {
  get isSchema() { return true }
  get connection() { return this.parent.connection }
  
  constructor(connEl, schemaName) {
    super({
      parent: connEl,
      name: schemaName,
      contextValue: 'pgSchema'
    })
  }
  async _getChildren() {
    const tbList = await this.connection.tbList(this.name)
    return tbList.map(tb => new TableElement(this, this.name, tb.name,
      [this.parent.parent.name, this.parent.name, this.name, tb.name],
      this.parent.connection || this.parent.parent.connection
    ))
  }
}
exports.PgsqlSchemaElement = PgsqlSchemaElement