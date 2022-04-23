const Webview = require('./common/base')
const service = require('../../service/connection')
const { noty } = require('../../utils')

module.exports = class UpsertConnectionWebview extends Webview {
  constructor(record) {
    super({
      filename: 'upsert-connection',
      title: record ? '更新连接' : '创建连接',
      initData: record
    })
  }
  
  async save(data) {
    try {
      await service.upsert(data.connection)
      noty.info('连接已保存')
      if(data.connect)
        service.connect(data.connection)
    } catch(err) {
      this.handleSaveErr(err)
    }
  }
}