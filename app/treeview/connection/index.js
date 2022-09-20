const vscode = require('vscode')
const Tree = require('./element/root')

class ConnectionTreeview {
  init() {
    const updateEvent = new vscode.EventEmitter()
    const root = this.root = new Tree(updateEvent)

    return {
      showCollapseAll: true,
      treeDataProvider: {
        onDidChangeTreeData: updateEvent.event,
        getChildren(el = root) {
          return el.getChildren()
        },
        getTreeItem(el) {
          return el.getTreeItem()
        }
      }
    }
  }

  addConnection() {

  }

  reload(el = this.root) {
    
  }
}


module.exports = new ConnectionTreeview()