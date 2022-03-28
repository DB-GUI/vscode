const vscode = require('vscode')
const mixin = require('@ppzp/mixin')

function Element() {}
const adam = new Element()

function Parent() {
  this.children = null
}

function Child(parent, type, connection, treeItem) {
  this.parent = parent
  this.type = type
  this.connection = connection
  this.treeItem = treeItem
}

function Happy(parent, type, connection, treeItem) {
  mixin(this, Parent)
  mixin(this, Child, [parent, type, connection, treeItem])
}

function RootElement() {
  mixin(this, Parent)
}
RootElement.prototype = adam

function ConnectionElement(parent, connection, options) {
  mixin(this, Happy, [parent, 'connection', connection, {
    label: options.name || '未命名连接',
    icon: `dbms/${options.client}.svg`
  }])
  this.options = options
}
ConnectionElement.prototype = adam

function DatabaseElement(parent, connection, databaseName) {
  mixin(this, Happy, [parent, 'database', connection, {
    label: databaseName,
    // icon: 'database.svg'
  }])
  this.name = databaseName
}
DatabaseElement.prototype = adam

function TableElement(parent, connection, tableName) {
  mixin(this, Child, [parent, 'table', connection, {
    label: tableName,
    icon: 'table.svg',
    collapsibleState: vscode.TreeItemCollapsibleState.None
  }])
  this.name = tableName
}
TableElement.prototype = adam

module.exports = {
  RootElement,
  ConnectionElement,
  DatabaseElement,
  TableElement
}