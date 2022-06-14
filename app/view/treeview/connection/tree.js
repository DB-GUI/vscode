const connectionService = require('../../../service/connection')
const vscode = require('vscode')
const Path = require('path')
const util = require('../../../../lib/vscode-utils/noty')

class TreeviewElement {
  constructor({
    parent,
    collapse = vscode.TreeItemCollapsibleState.Collapsed
  }) {
    this.parent = parent
    this.collapse = collapse
  }

  getTreeItem(label = this.name) {
    return new vscode.TreeItem(label, this.collapse)
  }

  async getChildren() {
    if(!this._children)
      this._children = await this._getChildren()
    return this._children
  }
  getIconPath(path) {
    return Path.join(__filename, '../../../../../assets/icon/', path)
  }
}

class RootElement extends TreeviewElement {
  constructor() {
    super({})
  }
  _getChildren() {
    return connectionService.getAllData().map(
      options => new connMap[options.client](this, options)
    )
  }
}

class ConnectionElement extends TreeviewElement {
  constructor(rootElement, options) {
    super({
      parent: rootElement
    })
    this.options = options
  }
  getTreeItem() {
    const result = super.getTreeItem(this.options.name)
    result.iconPath = this.getIconPath(`dbms/${this.options.client}.svg`)
    return result
  }
  
  async _getChildren() {
    if(!this.connection)
      this.connection = connectionService.connect(this.options)
    try {
      return await this._getChildren2()
    } catch(err) {
      console.error('连接失败', err)
      util.fatal('连接失败 ' + err)
    }
  }
}

class TableElement extends TreeviewElement {
  constructor(parent, tbName) {
    super({
      parent,
      collapse: vscode.TreeItemCollapsibleState.None
    })
    this.name = tbName
  }

  getTreeItem() {
    const result = super.getTreeItem()
    result.iconPath = this.getIconPath('table.svg')
    return result
  }
}

// mysql
class MysqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(dbName => new MysqlDatabaseElement(this, dbName))
  }
}
class MysqlDatabaseElement extends TreeviewElement {
  constructor(connectionElement, dbName) {
    super({
      parent: connectionElement
    })
    this.name = dbName
  }
  async _getChildren() {
    const tbList = await this.parent.connection.tbList(this.name)
    return tbList.map(name => new TableElement(this, name))
  }
}

// sqlite3
class Sqlite3Element extends ConnectionElement {
  async _getChildren2() {
    const tbList = await this.connection.tbList()
    return tbList.map(name => new TableElement(this, name))
  }
}

// pgsql
class PgsqlElement extends ConnectionElement {
  async _getChildren2() {
    const dbList = await this.connection.dbList()
    return dbList.map(name => new PgsqlDatabaseElement(this, name, this.options.database == name))
  }
}
class PgsqlDatabaseElement extends TreeviewElement {
  constructor(connEl, dbName, isDefault) {
    super({
      parent: connEl
    })
    this.name = dbName
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
}
class PgsqlSchemaElement extends TreeviewElement {
  constructor(connEl, schemaName) {
    super({
      parent: connEl
    })
    this.name = schemaName
  }
  async _getChildren() {
    const tbList = await this.parent.getConn().tbList(this.name)
    return tbList.map(tbName => new TableElement(this, tbName))
  }
}

// ...
const connMap = {
  mysql: MysqlElement,
  sqlite3: Sqlite3Element,
  postgresql: PgsqlElement
}
module.exports = RootElement