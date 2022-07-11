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
    let { useUrl, url, client } = data.record
    if(client == 'mysql' && useUrl && url) {
      url = new URL(url)
      url.searchParams.set('multipleStatements', true)
      data.record.url = url.href
    }
    console.debug('upserting connection', data.record)
    await service.upsert(data)
  }
}