import { render_root } from '@/main/webview/util_entry'

/**
 * 这个文件是 webview（网页）的入口文件（类似于常规 Vue、React 应用的 main.js 或 dist.js 或 bundle.js 或 src/index.js）
 * webview 的入口文件必须放在 src/main/webview/all/ 文件夹下
 * 注意：webview 运行于被隔离的环境（类似与一个浏览器里的网页）中，不能直接调用 vscode 插件的 api
 */

function Root() {
  return <div>
    <h1>This is a demo</h1>
    <p>this is some text</p>
  </div>
}

render_root(Root)
