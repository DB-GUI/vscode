const { tree } = require('../treeview/connection')
const { TreeviewElement } = require('../treeview/connection/tree/base')
const UpsertConnectionWebview = require('../webview/upsert-connection')
const TerminalWebview = require('../webview/ppz-terminal')
const openTableWebview = require('../webview/table')
const noty = require('../../lib/vscode-utils/noty')

exports.openTable = openTableWebview

// 点击“添加按钮”，开始填“连接信息”，此时还未添加完成
exports.addConnection = function() {
  new UpsertConnectionWebview()
}

exports.refreshTreeChildren = function(el = tree) {
  checkEl(el)
  el.refresh()
}
// 点击“编辑按钮”，开始填“连接信息”，此时还未编辑完成
exports.editTreeItem = function(el) {
  checkEl(el)
  new UpsertConnectionWebview(el.options)
}
exports.terminal = function(el) {
  checkEl(el)
  el.terminal()
}
exports.ppzTerminal = function(el) {
  checkEl(el)
  new TerminalWebview(el.connection.clone())
}
// 点击“删除按钮”，此时还未删除
exports.deleteTreeItem = async function(el) {
  checkEl(el)
  el.startDrop()
}
// 导出数据
exports.exportDML = async function(el) {
  checkEl(el)
  el.connection.exportDML(el)
}
// 导出表结构
exports.exportDDL = async function(el) {
  checkEl(el)
  el.connection.exportDDL(el)
}
// 导出结构和数据
exports.export = async function(el) {
  checkEl(el)
  el.connection.export(el)
}

function checkEl(el) {
  if(el instanceof TreeviewElement)
    return
  
  noty.warn('请从左侧 PPZ 视图里操作')
  throw Error('用户可能直接执行了命令')
}