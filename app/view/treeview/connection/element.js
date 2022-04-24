const vscode = require('vscode')
const mixin = require('@ppzp/mixin')

function Element() {}
const adam = new Element()

function Parent() {
  this.children = null
}

function Child(parent, connection, treeItem) {
  this.parent = parent
  this.connection = connection
  this.treeItem = treeItem
}

function Happy(parent, connection, treeItem) {
  mixin(this, Parent)
  mixin(this, Child, [parent, connection, treeItem])
}

function RootElement() {
  mixin(this, Parent)
}
RootElement.prototype = Object.create(adam)
RootElement.prototype.type = 'root'

function ConnectionElement(parent, connection, options, connect) {
  mixin(this, Happy, [parent, connection, {
    label: options.name || '未命名连接',
    icon: `dbms/${options.client}.svg`,
    collapsibleState: connect
      ? vscode.TreeItemCollapsibleState.Expanded
      : vscode.TreeItemCollapsibleState.Collapsed
  }])
  this.options = options
  if(options.client == 'sqlite3')
    this.type = 'sqlite3-connection'
  ConnectionElement.instance.push(this)
}
ConnectionElement.instance = []
ConnectionElement.prototype = Object.create(adam)
ConnectionElement.prototype.type = 'connection'
ConnectionElement.prototype.updateOptions = function(options, connect) {
  this.treeItem = {
    label: options.name || '未命名连接',
    icon: `dbms/${options.client}.svg`,
    collapsibleState: connect
      ? vscode.TreeItemCollapsibleState.Expanded
      : vscode.TreeItemCollapsibleState.Collapsed
  }
  this.options = options
}

function DatabaseElement(parent, connection, databaseName) {
  mixin(this, Happy, [parent, connection, {
    label: databaseName,
    // icon: 'database.svg'
  }])
  this.name = databaseName
}
DatabaseElement.prototype = Object.create(adam)
DatabaseElement.prototype.type = 'database'

function TableElement(parent, connection, tableName) {
  mixin(this, Child, [parent, connection, {
    label: tableName,
    icon: 'table.svg',
    command: {
      command: 'ppz.openTable',
      title: 'Open Table',
      arguments: [this]
    },
    collapsibleState: vscode.TreeItemCollapsibleState.None
  }])
  this.name = tableName
}
TableElement.prototype = Object.create(adam)
TableElement.prototype.type = 'table'

module.exports = {
  RootElement,
  ConnectionElement,
  DatabaseElement,
  TableElement
}