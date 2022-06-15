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
    const schemaList = await this.getConn().schemaList()
    return schemaList.map(schemaName => new PgsqlSchemaElement(this, schemaName))
  }
  getConn() {
    if(this.isDefault)
      return this.parent.connection
    if(!this.connection)
      this.connection = connectionService.connect(Object.assign({}, this.parent.options, {
        database: this.name
      }))
    return this.connection
  }

  close() {
    if(this.connection)
      this.connection.close()
  }
}
class PgsqlSchemaElement extends TreeviewElement {
  constructor(connEl, schemaName) {
    super({
      parent: connEl,
      name: schemaName,
      contextValue: 'parentEl'
    })
  }
  async _getChildren() {
    const tbList = await this.parent.getConn().tbList(this.name)
    return tbList.map(tbName => new TableElement(this, this.name, tbName,
      [this.parent.parent.name, this.parent.name, this.name, tbName],
      this.parent.connection || this.parent.parent.connection
    ))
  }
}