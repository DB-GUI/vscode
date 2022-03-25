const vscode = require('vscode')
const connectionService = require('../../service/connection')
const { noty } = require('../../utils')
const Path = require('path')

module.exports = function() {
  vscode.window.registerTreeDataProvider('connections', {
    getChildren, getTreeItem
  })
}

function El(type, treeItem, connection, data) {
  return { type, treeItem, connection, data }
}
async function getChildren(el) {
  try {
    if(!el) // root
      return connectionService.getAllData()
        .map(data => El('connection', {
          label: data.name || '未命名连接',
          icon: `dbms/${data.client}.svg`
        }, null, data))
    switch(el.type) {
      case 'connection':
        try {
          if(!el.connection)
            el.connection = connectionService.connect(el.data)
          const dbList = await el.connection.dbList()
          return dbList.map(name => El('database', {
            label: name,
            // icon: 'database.svg'
          }, el.connection, { name }))
        } catch(err) {
          const msg = '连接建立失败，请检查连接信息和数据库服务器的设置'
          console.error(msg, el.data, err)
          noty.error(msg)
          return []
        }
      case 'database':
        try {
          const tbList = await el.connection.tbList(el.data.name)
          return tbList.map(name => El('table', {
            label: name,
            icon: 'table.svg',
            collapsibleState: vscode.TreeItemCollapsibleState.None
          }, el.connection, {
            name,
            db: el.data.name
          }))
        } catch(err) {
          const msg = '获取 table 列表时发生异常，可尝试刷新连接'
          console.error(msg, err)
          noty.error(msg)
          return []
        }
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
    result.iconPath = Path.join(__filename, '../../../../assets/icon', icon)
  return result
}