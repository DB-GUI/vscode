import Path from 'path'
import vscode from 'vscode'
import { get as getContext } from '@ppzp/context'

export
class TreeviewElement {
  constructor({
    parent,
    updateEvent,
    name,
    contextValue,
    collapse = vscode.TreeItemCollapsibleState.Collapsed
  }) {
    this.parent = parent
    this.updateEvent = updateEvent || parent.updateEvent
    this.name = name
    this.contextValue = contextValue
    this.collapse = collapse
  }

  getTreeItem() {
    const result = new vscode.TreeItem(this.name, this.collapse)
    if(this.contextValue)
      result.contextValue = this.contextValue
    return result
  }

  // 对外的“获取子节点”函数，功能仅在于“懒加载”
  // 具体的“获取子节点”功能在 _getChildren 里实现
  async getChildren() {
    if(!this._children) {
      console.debug('getChildren', this.name)
      this._children = await this._getChildren()
    }
    return this._children
  }

  refresh() {
    this._children = null
    this.updateEvent.fire(this)
  }
  
  getIconPath(path) {
    return Path.join(getContext().extensionPath, 'assets/icon/', path)
  }
}

export
class TableElement extends TreeviewElement {
  get isTable() { return true }
  constructor(parent, schemaName, tbName, names, connection) {
    super({
      parent,
      name: tbName,
      contextValue: 'table',
      collapse: vscode.TreeItemCollapsibleState.None
    })
    this.schemaName = schemaName
    this.names = names
    this.connection = connection
  }

  getTreeItem() {
    const result = super.getTreeItem()
    result.iconPath = this.getIconPath('table.svg')
    result.command = {
      command: 'ppz.openTable',
      title: 'Open Table',
      arguments: [this]
    }
    return result
  }
}