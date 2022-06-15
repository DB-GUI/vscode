const { TreeviewElement } = require('../base')
const connectionService = require('../../../../../service/connection')

module.exports =
class ConnectionElement extends TreeviewElement {
  constructor(rootElement, options) {
    super({
      parent: rootElement,
      name: options.name,
      contextValue: 'connection'
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
}