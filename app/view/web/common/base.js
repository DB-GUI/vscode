const Path = require('path')
const fs = require('fs')
const vscode = require('vscode')
const { NilField, FieldWrongDetail } = require('@ppzp/type')
const { noty } = require('../../../utils')
const WebviewServer = require('../../../../lib/request/server')

module.exports = class {
  constructor({
    filename,
    category = 'ppz',
    title = 'ppz',
    webviewServerHandlers
  }) {
    console.debug('webview constructing', filename)
    const path = this.localPath('webview/pages/' + filename + '/index.html')
    console.debug(path)
    fs.readFile(path, (err, data) => {
      if(err) {
        const msg = 'webview 创建失败：读取 html 文件时发生异常'
        console.error(msg)
        console.error(err)
        throw Error(msg)
      }
      this.panel.webview.html = this.tmpl({
        filename,
        title,
        body: data.toString()
      })
    })

    this.panel = vscode.window.createWebviewPanel(
      category,
      title,
      vscode.ViewColumn.One,
      {
        localResourceRoots: [vscode.Uri.file(Context.extensionPath)],
        enableScripts: true
      }
    )
    this.panel.iconPath = {
      light: this.uri('logo.svg'),
      dark: this.uri('logo-white.svg')
    }

    new WebviewServer(this.panel.webview, Context.subscriptions, Object.assign({
      dispose: () => {
        this.panel.dispose()
      },
      saveState: state => {
        this.state = state
      }
    }, webviewServerHandlers))

    console.debug('webview constructed')
  }

  webviewUri(path) {
    return this.panel.webview.asWebviewUri(vscode.Uri.file(
      Path.join(Context.extensionPath, 'assets/webview', path)
    ))
  }

  localPath(path) {
    return Path.join(__dirname, '../../../../assets', path)
  }

  uri(path) {
    return vscode.Uri.file(this.localPath(path))
  }

  sendMessage(type, data) {
    const msg = { type, data }
    console.debug('sending message to webview', { type })
    this.panel.webview.postMessage(msg)
  }

  handleSaveErr(err) {
    if(err instanceof FieldWrongDetail) {
      noty.error('保存失败：' + err.name + (
        err.type == NilField
        ? ' 未填写'
        : ' 格式错误'
      ))
    } else
      this.handleErr(err)
  }

  handleErr(err) {
    console.error(err)
    noty.error('未知错误 ' + err.toString())
  }

  getInitData() {
    return {}
  }

  tmpl({
    filename,
    title,
    body
  }) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="stylesheet" href="${this.webviewUri('style/index.css')}">
        </head>
        <body>
          ${body}
          <script>
            window.VSCODE = acquireVsCodeApi()
            window.PPZ = {
              initData: ${JSON.stringify(this.getInitData())},
              getState() {
                return ${JSON.stringify(this.state)}
              }
            }
            console.debug({ PPZ })
          </script>
          <script type="module" src="${this.webviewUri(`pages/${filename}/index.js`)}"></script>
        </body>
      </html>
    `
  }
}