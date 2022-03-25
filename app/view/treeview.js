const vscode = require('vscode')
const connectionService = require('../service/connection')
const { noty } = require('../utils')
const Path = require('path')

module.exports = function() {
  vscode.window.registerTreeDataProvider('connections', {
    getChildren, getTreeItem
  })
}

const El = (type, data, treeItem) => ({ type, data, treeItem })
async function getChildren(el) {
  try {
    if(!el) // root
      return connectionService.getAllData()
        .map(data => El('connection', data, {
          label: data.name || '未命名连接',
          icon: `dbms/${data.client}.svg`
        }))
    switch(el.type) {
      case 'connection':
        try {
          if(!el.connection)
            el.connection = connectionService.connect(el.data)
          const dbList = await el.connection.dbList()
          return dbList.map(name => El('database', { name }, {
            label: name,
            icon: 'database.svg'
          }))
        } catch(err) {
          const msg = '连接建立失败，请检查连接信息和数据库服务器的设置'
          console.error(msg, el.data, err)
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

async function getTreeItem({ treeItem: {
  label, icon, collapsibleState = vscode.TreeItemCollapsibleState.Collapsed
}}) {
  const result = new vscode.TreeItem(label, collapsibleState)
  if(icon)
    result.iconPath = Path.join(__filename, '../../../assets/icon', icon)
  return result
}