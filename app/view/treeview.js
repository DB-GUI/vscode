const vscode = require('vscode')
const connectionService = require('../service/connection')
const { noty } = require('../utils')

module.exports = function() {
  vscode.window.registerTreeDataProvider('connections', {
    getChildren, getTreeItem
  })
}

function El(type, data) {
  return { type, data }
}
async function getChildren(el) {
  try {
    if(!el) // root
      return connectionService.getAllData()
        .map(data => El('connection', data))
    switch(el.type) {
      case 'connection':
        try {
          if(!el.connection)
            el.connection = connectionService.connect(el.data)
          const dbList = await el.connection.dbList()
          return dbList.map(name => El('database', { name }))
        } catch(err) {
          const msg = '连接建立失败，请检查连接信息和数据库服务器的设置'
          console.error(msg, el.data)
          noty.error(msg)
          return []
        }
      case 'database':
        // TODO
      
      default:
        const msg = '意外的结点类型 ' + el.type
        console.error(msg)
        noty.fatal(msg)
        return []
    }
  } catch(err) {
    const msg = 'Treeview getChildren 时发生异常'
    console.error(msg, err)
    noty.fatal(msg)
  }
}

async function getTreeItem(el) {
  switch(el.type) {
    case 'connection':
      return new ConnectionTreeItem(el.data.name)
    case 'database':
      return new DatabaseTreeItem(el.data.name)
    default:
      throw Error('意外的结点类型', el)
  }
}


class TreeItem extends vscode.TreeItem {
  constructor(label, collapsibleState = vscode.TreeItemCollapsibleState.Collapsed) {
    super(label, collapsibleState)
  }
}
class ConnectionTreeItem extends TreeItem {
  constructor(name) {
    super(name || '未命名连接')
  }
}
class DatabaseTreeItem extends TreeItem {
  constructor(label) {
    super(label)
  }
}