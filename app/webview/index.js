const Path = require('path')
const fs = require('fs')
const vscode = require('vscode')

module.exports = class {
  constructor({
    filename,
    category = 'ppz',
    title = 'ppz'
  }) {
    console.debug('constructing add-connection.html webview')
    const path = this.localPath('pages/' + filename + '/index.html')
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
    this.onMessage('dispose', () => {
      this.panel.dispose()
    })
    console.debug('constructed add-connection.html webview')
  }

  webviewUri(path) {
    return this.panel.webview.asWebviewUri(vscode.Uri.file(
      Path.join(Context.extensionPath, 'assets', path)
    ))
  }

  localPath(path) {
    return Path.join(__dirname, '../../assets', path)
  }

  uri(path) {
    return vscode.Uri.file(this.localPath(path))
  }

  onMessage(type, handler) {
    console.debug('注册 message', type)
    this.panel.webview.onDidReceiveMessage(evt => {
      if(!evt.type) {
        console.error({ evt })
        throw Error('不合法的 message')
      }
      if(evt.type == type) {
        console.debug('webview message', evt)
        handler(evt)
      }
    })
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
          <link rel="stylesheet" href="${this.webviewUri('pages/style/index.css')}">
        </head>
        <body>
          ${body}
          <script type="module" src="${this.webviewUri(`pages/${filename}/index.js`)}"></script>
        </body>
      </html>
    `
  }
}