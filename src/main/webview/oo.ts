import { join } from 'path'
import { v4 as UUID } from 'uuid'
import { ExtensionContext, WebviewPanel, window, ViewColumn, Uri } from 'vscode'
import util_meta from '@/common/util_meta'
import make_webview_server from '@/lib/webview_request/server'
import { logger } from '@/main/util'

// const get_path = (context: ExtensionContext, relative_path: string) =>
//   join(context.extensionPath, relative_path)
const get_uri = (context: ExtensionContext, relative_path: string) =>
  Uri.file(join(context.extensionPath, relative_path))

export
class Webview_wrapper {
  protected panel: WebviewPanel
  constructor(
    protected context: ExtensionContext,
    handler: Record<string, Function> = {},
  ) {
    this.context = context
    this.panel = window.createWebviewPanel(
      util_meta.name,
      'test',
      ViewColumn.One,
      {
        localResourceRoots: [get_uri(context, '')],
        enableScripts: true
      }
    )
    this.panel.iconPath = {
      light: get_uri(context, 'asset/icon/black.svg'),
      dark: get_uri(context, 'asset/icon/white.svg')
    }

    make_webview_server(
      this.panel.webview,
      Object.entries(handler),
      logger,
    )
  }
  
  // webview 内静态资源引用 https://code.visualstudio.com/api/extension-guides/webview#loading-local-content
  get_uri(r_path: string) {
    return this.panel.webview.asWebviewUri(get_uri(this.context, r_path))
  }
}

interface Html_option {
  title: string
  name: string
}

export
class Webview_wrapper_react extends Webview_wrapper {
  constructor(context: ExtensionContext, html: Html_option, handler?: Record<string, Function>) {
    super(context, handler)
    this.panel.webview.html = `
      <!DOCTYPE HTML>
      <html>
        <head>
          <title>${html.title}</title>
          <link rel="stylesheet" href="${this.get_uri(`webview/${html.name}/index.css`)}"></link>
        </head>
        <body>
          <div id="react_root">loading</div>
          <script>
            console.log('setting PPz...')
            window.PPz = {
              id: '${UUID()}',
            }
            console.log('PPz ready', { PPz })
          </script>
          <script type="module" src="${this.get_uri(`webview/${html.name}/index.js`)}"></script>
        </body>
      </html>
    `
  }
}
