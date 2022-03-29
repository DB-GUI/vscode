const vscode = require('vscode')
const Path = require('path')
const { noty } = require('../../../utils')
const connectionService = require('../../../service/connection')
const {
  ConnectionElement, DatabaseElement, TableElement
} = require('./element')

module.exports = function(root, updateEvent) {
  return {
    onDidChangeTreeData: updateEvent.event,
    getChildren,
    getTreeItem
  }

  async function getChildren(el = root) {
    if(el.children)
      return el.children
    try {
      return el.children = await async function() {
        switch(el.type) {
          case 'root':
            return connectionService.getAllData().map(
              options => new ConnectionElement(root, null, options)
            )
          case 'connection':
            try {
              el.connection = connectionService.connect(el.options)
              const dbList = await el.connection.dbList()
              return dbList.map(
                name => new DatabaseElement(el, el.connection, name)
              )
            } catch(err) {
              const msg = '连接建立失败，请检查连接信息和数据库服务器的设置'
              console.error(msg, el.options, err)
              noty.error(msg)
              return []
            }
          case 'database':
            try {
              const tbList = await el.connection.tbList(el.name)
              return tbList.map(
                name => new TableElement(el, el.connection, name)
              )
            } catch(err) {
              const msg = '获取 table 列表时发生异常，可尝试刷新连接'
              console.error(msg, `[database ${el.name}]`, err)
              noty.error(msg)
              return []
            }
          default:
            const msg = '意外的结点类型 ' + el.type
            console.error(msg)
            noty.fatal(msg)
            return []
        }
      }()
    } catch(err) {
      const msg = 'Treeview getChildren 时发生异常'
      console.error(msg, err)
      noty.fatal(msg)
      return []
    }
  }
  
  async function getTreeItem({ type, treeItem: {
    label, icon, collapsibleState = vscode.TreeItemCollapsibleState.Collapsed
  }}) {
    const result = new vscode.TreeItem(label, collapsibleState)
    result.contextValue = type
    if(icon)
      result.iconPath = Path.join(__filename, '../../../../../assets/icon', icon)
    return result
  }
}