const vscode = require('vscode')
const connectionService = require('../../../../service/connection')
const { TreeviewElement } = require('./base')
const getConEl = require('./connection/index')

module.exports =
class RootElement extends TreeviewElement {
  constructor(updateEvent) {
    super({
      updateEvent,
      name: 'root'
    })
  }
  _getChildren() {
    return connectionService.getAll().map(
      options => getConEl(this, options)
    )
  }
  refresh() {
    if(this._children) {
      for(const child of this._children)
        child.close()
      this._children = null
      this.updateEvent.fire()
    }
  }

  addChild(options, connect) {
    const child = getConEl(this, options)
    child.collapse = vscode.TreeItemCollapsibleState[connect?'Expanded':'Collapsed']
    this._children.push(child)
    this.updateEvent.fire()
  }
  updateChild(options, connect) {
    // 更新入口在 treeview，此时 treeview 一定展开过，this._children 一定存在
    const index = this._children.findIndex(conn => conn.options.id == options.id)
    this._children[index].close()
    const newChild = getConEl(this, options)
    newChild.collapse = vscode.TreeItemCollapsibleState[connect?'Expanded':'Collapsed']
    this._children.splice(index, 1, newChild)
    this.updateEvent.fire()
  }
  dropChild(el) {
    const index = this._children.indexOf(el)
    this._children.splice(index, 1)
    this.updateEvent.fire()
  }
}
