import vscode from 'vscode'
import Tree from './element/root'

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

  addConnection(options, connect) {
    this.root.addChild(options, connect)
  }
  updateConnection(options, connect) {
    this.root.updateChild(options, connect)
  }

  reload(el = this.root) {
    el.refresh()
  }
}

export default new ConnectionTreeview()