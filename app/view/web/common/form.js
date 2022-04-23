const Webview = require('./base')
const { NilField, FieldWrongDetail } = require('@ppzp/type')
const { noty } = require('../../../utils')

module.exports = class FormWebview extends Webview {
  constructor(options) {
    options.webviewServerHandlers = Object.assign({
      save: data => this.save(data)
    }, options.webviewServerHandlers)
    super(options)
  }

  async save(data) {
    try {
      return await this.upsert(data)
    } catch(err) {
      if(err instanceof FieldWrongDetail) {
        noty.error('保存失败：' + err.name + (
          err.type == NilField
          ? ' 未填写'
          : ' 格式错误'
        ))
      } else
        this.handleErr(err)
    }
  }
}