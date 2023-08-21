import { join } from 'path'
import { ExtensionContext, WebviewPanel, window, ViewColumn, Uri } from 'vscode'
import { meta_util } from '@/util'
import { All_state } from '@/state/oo'

interface Webview_context {
  ext_context: ExtensionContext
  state: All_state
}

// const get_path = (context: ExtensionContext, relative_path: string) =>
//   join(context.extensionPath, relative_path)
const get_uri = (context: ExtensionContext, relative_path: string) =>
  Uri.file(join(context.extensionPath, relative_path))

export
class Webview_wrapper {
  context: Webview_context
  panel: WebviewPanel
  constructor(context: Webview_context) {
    this.context = context
    this.panel = window.createWebviewPanel(
      meta_util.name,
      'test',
      ViewColumn.One,
      {
        localResourceRoots: [get_uri(context.ext_context, '')],
        enableScripts: true
      }
    )
    this.panel.iconPath = {
      light: get_uri(context.ext_context, 'asset/icon/black.svg'),
      dark: get_uri(context.ext_context, 'asset/icon/white.svg')
    }
  }
  
  // webview 内静态资源引用 https://code.visualstudio.com/api/extension-guides/webview#loading-local-content
  get_uri(r_path: string) {
    return this.panel.webview.asWebviewUri(get_uri(this.context.ext_context, r_path))
  }
}

interface Html_option {
  title: string
  name: string
}

export
class Webview_wrapper_react extends Webview_wrapper {
  constructor(context: Webview_context, html: Html_option) {
    super(context)
    this.panel.webview.html = `
      <!DOCTYPE HTML>
      <html>
        <head>
          <title>${html.title}</title>
          <link rel="stylesheet" href="webview/${html.name}.css"></link>
        </head>
        <body>
          <div id="react_root">loading</div>
          <script type="module" src="${this.get_uri(`webview/${html.name}.js`)}"></script>
        </body>
      </html>
    `
  }
}
