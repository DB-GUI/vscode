import connectionTreeview from '../treeview/connection/index.js'
import { TreeviewElement } from '../treeview/connection/element/base.js'
import ConnectionElement from '../treeview/connection/element/adapter/base'
import { MssqlDatabaseElement } from '../treeview/connection/element/adapter/mssql.js'
import { PgsqlDatabaseElement } from '../treeview/connection/element/adapter/pgsql.js'
import UpsertConnectionWebview from '../webview/upsert-connection.js'
import TerminalWebview from '../webview/ppz-terminal.js'
import openTableWebview from '../webview/table.js'
import noty from '../../lib/vscode-utils/noty/index.js'

export default {
  // 重新加载子节点
  reloadTreeItemChildren(el) {
    connectionTreeview.reload(el)
  },

  // 打开“添加连接”页面
  addConnection() {
    new UpsertConnectionWebview()
  },
  // 打开“编辑连接”页面
  editConnection: execBeforeCheckEl(
    ConnectionElement,
    el => new UpsertConnectionWebview(el.options)
  ),
  // 发起“删除连接”确认
  deleteConnection: execBeforeCheckEl(
    ConnectionElement,
    el => el.startDrop()
  ),
  // sql 终端
  ppzTerminal: execBeforeCheckEl(
    [ConnectionElement, MssqlDatabaseElement, PgsqlDatabaseElement],
    el => new TerminalWebview(el.connection.clone())
  ),

  // 打开 table
  openTableWebview,

  // 系统终端
  terminal(el) {
    throw Error('此功能待实现')
  },

  // 导出数据
  exportDML: execBeforeCheckEl(
    TreeviewElement,
    el => el.connection.exportDML(el)
  ),
  // 导出表结构
  exportDDL: execBeforeCheckEl(
    TreeviewElement,
    el => el.connection.exportDDL(el)
  ),
  // 导出结构和数据
  exportBoth: execBeforeCheckEl(
    TreeviewElement,
    el => el.connection.export(el)
  )
}

function execBeforeCheckEl(ElTypes, exec) {
  if(!(ElTypes instanceof Array))
    ElTypes = [ElTypes]
  return el => {
    if(ElTypes.every(El => !(el instanceof El))) {
      noty.warn('请在 PPZ 视图里进行此操作')
      console.warn('用户似乎从 Command Palette 调用此命令', el)
      return
    }
    return exec(el)
  }
}
