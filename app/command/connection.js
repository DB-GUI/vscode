import connectionTreeview from '../treeview/connection/index.js'
import { TreeviewElement } from '../treeview/connection/element/base.js'
import UpsertConnectionWebview from '../webview/upsert-connection.js'
import TerminalWebview from '../webview/ppz-terminal.js'
import openTableWebview from '../webview/table.js'
import noty from '../../lib/vscode-utils/noty/index.js'

export {
  openTableWebview as openTable
}

// 点击“添加按钮”，开始填“连接信息”，此时还未添加完成
export
function addConnection() {
  new UpsertConnectionWebview()
}

export
function refreshTreeChildren(el) {
  connectionTreeview.reload(el)
}
// 点击“编辑按钮”，开始填“连接信息”，此时还未编辑完成
export
function editTreeItem(el) {
  checkEl(el)
  new UpsertConnectionWebview(el.options)
}

export
function terminal(el) {
  checkEl(el)
  el.terminal()
}

export
function ppzTerminal(el) {
  checkEl(el)
  new TerminalWebview(el.connection.clone())
}

// 点击“删除按钮”，此时还未删除
export
function deleteTreeItem(el) {
  checkEl(el)
  el.startDrop()
}

// 导出数据
export
function exportDML(el) {
  checkEl(el)
  el.connection.exportDML(el)
}
// 导出表结构
export
function exportDDL(el) {
  checkEl(el)
  el.connection.exportDDL(el)
}

// 导出结构和数据
export
function exportBoth(el) {
  checkEl(el)
  el.connection.export(el)
}

function checkEl(el) {
  if(el instanceof TreeviewElement)
    return
  
  noty.warn('请从左侧 PPZ 视图里操作')
  throw Error('用户可能直接执行了命令')
}