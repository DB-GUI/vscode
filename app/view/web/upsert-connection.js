const Webview = require('./index')
const service = require('../../service/connection')
const { noty } = require('../../utils')

module.exports = class UpsertConnectionWebview extends Webview {
  constructor() {
    super({
      filename: 'upsert-connection',
      title: '创建连接'
    })
    this.onMessage('save', data => this.save(data))
  }

  async save(data) {
    try {
      const id = await service.upsert(data.connection)
      noty.info('连接已保存')
      if(data.connect)
        service.connect(id)
    } catch(err) {
      this.handleSaveErr(err)
    }
  }
}