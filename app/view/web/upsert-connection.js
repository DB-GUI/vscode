const Webview = require('./common/form')
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

  async upsert(data) {
    await service.upsert(data)
    noty.info('连接已保存')
  }
}