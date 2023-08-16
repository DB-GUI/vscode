import vscode from 'vscode'
import connection from './connection'

export default
function initTreeview() {
  vscode.window.createTreeView('connection', connection.init())
}