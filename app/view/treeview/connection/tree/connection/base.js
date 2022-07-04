const { TreeviewElement } = require('../base')
const connectionService = require('../../../../../service/connection')
const noty = require('../../../../../../lib/vscode-utils/noty')
const warn = require('../../../../../../lib/vscode-utils/prompt/confirm').warn

module.exports =
class ConnectionElement extends TreeviewElement {
  get isConnection() { return true }
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
    if(!this.connection) // 刷新下方节点时，不需重新连接
      this.connection = connectionService.connect(this.options)
    try {
      return await this._getChildren2()
    } catch(err) {
      console.error('连接失败', err)
      noty.fatal('连接失败 ' + err)
    }
  }

  close() {
    if(this.connection)
      this.connection.close()
  }

  async startDrop() {
    if(await warn('确认删除？', '此操作将删除当前连接信息'))
      return
    // 数据删除
    try {
      connectionService.drop(this.options.id)
      console.debug('已删除连接', this.name)
    } catch(err) {
      noty.error('删除失败 ' + err)
      return
    }
    // 视图（元素）删除
    this.parent.dropChild(this)
    this.close()
    console.debug('已删除 treeview 元素', this.name)
  }

  terminal() {
    if(!this.connection) // 打开终端也会开启连接……日后改
      this.connection = connectionService.connect(this.options)
    this.connection.terminal()
  }
}