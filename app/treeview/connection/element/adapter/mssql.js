import { TreeviewElement, TableElement } from '../base'
import ConnectionElement from './base'
import connectionService from '../../../../service/connection'

export
class MssqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(name => new MssqlDatabaseElement(this, name))
  }
}

export
class MssqlDatabaseElement extends TreeviewElement {
  get isSchema() { return false }
  get connection() {
    if(!this._connection)
      this._connection = connectionService.connect(Object.assign({}, this.parent.options, {
        database: this.name
      }))
    return this._connection
  }

  constructor(connectionElement, name) {
    super({
      parent: connectionElement,
      name,
      contextValue: 'msDatabase'
    })
  }
  async _getChildren() {
    const schemaList = await this.connection.schemaList(this.id)
    return schemaList.map(options => new MssqlSchemaElement(this, options))
  }
}

export
class MssqlSchemaElement extends TreeviewElement {
  get isSchema() { return true }
  get connection() { return this.parent.connection }
  
  constructor(connEl, schemaName) {
    super({
      parent: connEl,
      name: schemaName,
      contextValue: 'msSchema'
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