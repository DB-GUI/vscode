import vscode from 'vscode'
import { TreeviewElement } from '../base'
import connectionService from '../../../../service/connection'
import noty from '../../../../../lib/vscode-utils/noty'
import { warn } from '../../../../../lib/vscode-utils/prompt/confirm'

export default
class ConnectionElement extends TreeviewElement {
  get isConnection() { return true }
  get connection() {
    if(!this._connection)
      this._connection = connectionService.connect(this.options)
    return this._connection
  }
  constructor(rootElement, options, contextValue) {
    super({
      parent: rootElement,
      name: options.name,
      contextValue: contextValue || 'connection'
    })
    this.options = options
  }
  getTreeItem() {
    const result = super.getTreeItem(this.name)
    result.iconPath = this.getIconPath(`dbms/${this.options.client}.svg`)
    return result
  }
  
  async _getChildren() {
    try {
      return await this._getChildren2()
    } catch(err) {
      console.error(vscode.l10n.t('Connect failed '), err)
      noty.fatal(vscode.l10n.t('Connect failed ') + err)
    }
  }

  close() {
    if(this._connection) {
      this._connection.close()
    }
  }

  async startDrop() {
    if(await warn(vscode.l10n.t('Delete. Are you sure?'), vscode.l10n.t('This operate will delete current connection info')))
      return
    // 数据删除
    try {
      connectionService.deleteById(this.options._id)
      console.debug('已删除连接', this.name)
    } catch(err) {
      noty.error(vscdode.l10n.t('Delete failed ') + err)
      return
    }
    // 视图（元素）删除
    this.parent.dropChild(this)
    this.close()
    console.debug('已删除 treeview 元素', this.name)
  }

  terminal() {
    this.connection.terminal()
  }
}