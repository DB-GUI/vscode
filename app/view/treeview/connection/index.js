const vscode = require('vscode')
const Tree = require('./tree/root')

const updateEvent = new vscode.EventEmitter()
const tree = new Tree(updateEvent)
exports.tree = tree

exports.options = {
  showCollapseAll: true,
  treeDataProvider: {
    onDidChangeTreeData: updateEvent.event,
    getChildren(el = tree) {
      return el.getChildren()
    },
    getTreeItem(el) {
      return el.getTreeItem()
    }
  }
}