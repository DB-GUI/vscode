import { join } from 'path'
import { v4 as UUID } from 'uuid'
import { ExtensionContext, Uri, window, ViewColumn } from 'vscode'
import make_webview_server from '@/lib/webview_request/server'
import util_meta from '@/common/util_meta'
import { logger } from '@/main/util'

interface Webview_options {
  title: string
  name: string
  html?: string
  handler?: Record<string, Function>
}

export
function make_webview(context: ExtensionContext, option: Webview_options) {
  // const get_path = (context: ExtensionContext, relative_path: string) =>
  //   join(context.extensionPath, relative_path)
  const get_uri = (relative_path: string) =>
    Uri.file(join(context.extensionPath, relative_path))

    console.log(get_uri(''))
  // 创建 webview
  const panel = window.createWebviewPanel(
    util_meta.name, // webview 的分类（没啥用）
    option.title, // webview 的标题
    ViewColumn.One, // 在第一栏打开 webview
    {
      // localResourceRoots: [get_uri('')], // html 允许加载的静态文件的目录（不能随意加载）
      enableScripts: true, // 开启 js（默认情况下，在 webview 里禁止运行 js）
    },
  )
  // 设置 webview 的 icon（类似于 html 的 favicon）
  panel.iconPath = {
    light: get_uri('asset/icon/black.svg'), // 亮模式的 icon
    dark: get_uri('asset/icon/white.svg'), // 暗模式的 icon
  }
  // 设置 webview 的 html
  panel.webview.html = option.html || `
    <!DOCTYPE HTML>
    <html>
      <head>
        <title>${option.title}</title>
        <link rel="stylesheet" href="${get_uri(`webview/${option.name}/index.css`)}"></link>
      </head>
      <body>
        <div id="react_root">loading</div>
        <script>
          console.log('setting PPz...')
          window.PPz = {
            id: '${UUID()}', // 每个 webview 都有一个 uuid
          }
          console.log('PPz ready', { PPz })
        </script>
        <script type="module" src="${get_uri(`webview/${option.name}/index.js`)}"></script>
      </body>
    </html>
  `
  
  // webview 与 插件 是隔离的，下面的操作是 webview 与插件的通信
  make_webview_server(
    panel.webview,
    Object.entries(option.handler || {}),
    logger,
  )
}
