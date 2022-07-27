const Webview = require('./common/form')
const service = require('../../service/connection')

module.exports = class UpsertConnectionWebview extends Webview {
  constructor(record) {
    super({
      filename: 'upsert-connection',
      title: record ? '更新连接' : '创建连接',
      initData: { record }
    })
  }

  async upsert(data) {
    console.debug('upserting connection', data.record)
    await service.upsert(data)
  }
}