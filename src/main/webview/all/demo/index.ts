import { ExtensionContext } from 'vscode'
import { make_webview } from '../../base'

/**
 * 创建并打开 demo webview
 * 这个函数写在哪里都可以，但为了增加内聚性，一般与 entry.tsx 放在同一个文件夹下
 */
export default
function make_demo_webview(context: ExtensionContext) {
  make_webview(context, {
    title: 'this is title', // 设置 webview 标题，类似 html 中的 <title>this is title</title>
    name: 'demo', // entry 的名字，即 entry.tsx 所在的文件夹的名字
  })
}
