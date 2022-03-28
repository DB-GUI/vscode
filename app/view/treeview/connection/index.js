const vscode = require('vscode')
const connectionService = require('../../../service/connection')
const { noty } = require('../../../utils')
const Path = require('path')
const {
  RootElement, ConnectionElement, DatabaseElement, TableElement
} = require('./element')

// 更新 treeview
const updateEvent = new vscode.EventEmitter()
// 删除结点
exports.delete = function(el) {
  console.debug('删除结点', el)
  const siblings = el.parent.children
  siblings.splice(siblings.indexOf(el), 1)
  const updateTarget = el.parent == root
    ? undefined : el.parent
  updateEvent.fire(updateTarget)
}
// treeviewDataProvider
const provider = exports.provider = {
  onDidChangeTreeData: updateEvent.event
}

var root = new RootElement()
provider.getChildren = async function(el = root) {
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

provider.getTreeItem = async function({ type, treeItem: {
  label, icon, collapsibleState = vscode.TreeItemCollapsibleState.Collapsed
}}) {
  const result = new vscode.TreeItem(label, collapsibleState)
  result.contextValue = type
  if(icon)
    result.iconPath = Path.join(__filename, '../../../../../assets/icon', icon)
  return result
}