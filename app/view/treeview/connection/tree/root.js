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
  refresh(updateEvent) {
    this._children = null
    for(const child of this._children)
      child.close()
    updateEvent.fire()
  }

  addChild(options, connect) {
    const child = getConEl(this, options)
    child.collapse = vscode.TreeItemCollapsibleState[connect?'Expanded':'Collapsed']
    this._children.push(child)
    this.updateEvent.fire()
  }
  // updateChild(options, connect) {

  // }
}
