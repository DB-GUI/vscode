const Path = require('path')
const fs = require('fs')
const vscode = require('vscode')
const { noty } = require('../../../utils')
const WebviewServer = require('../../../../lib/request/server')

module.exports = class Webview {
  constructor({
    filename,
    category = 'ppz',
    title = 'ppz',
    initData,
    webviewServerHandlers
  }) {
    console.debug('webview constructing', filename)
    // html 文件路径
    const path = this.localPath('webview/pages/' + filename + '/index.html')
    console.debug(path)
    // 读取 html 文件
    fs.readFile(path, (err, data) => {
      if(err) {
        const msg = 'webview 创建失败：读取 html 文件时发生异常'
        console.error(msg, err)
        throw Error(msg)
      }
      // 向空网页填充内容
      this.panel.webview.html = this.tmpl({
        filename,
        title,
        body: data.toString()
      })
    })
    this.initData = initData
    // 创建 webview
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
    // 处理来自网页的请求
    new WebviewServer(this.panel.webview, Context.subscriptions, Object.assign({
      noty: ({ type, msg }) => noty[type](msg),
      dispose: () => { // 销毁 webview
        this.panel.dispose()
      },
      saveState: state => { // 保存 state
        this.state = state
        console.debug('state saved')
      },
      getState: () => this.state
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

  handleErr(err) {
    console.error(err)
    noty.fatal('未知错误 ' + err.toString())
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
              initData: ${JSON.stringify(this.initData)},
            }
          </script>
          <script type="module" src="${this.webviewUri(`pages/${filename}/index.js`)}"></script>
        </body>
      </html>
    `
  }
}