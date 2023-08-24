import { ExtensionContext } from 'vscode'
import { Webview_wrapper_react } from '@/main/webview/oo'

/**
 * 创建并打开 demo webview
 * 这个函数写在哪里都可以，但为了增加内聚性，一般与 entry.tsx 放在同一个文件夹下
 */
export default
function create_webview(context: ExtensionContext) {
  new Webview_wrapper_react(
    context,
    {
      title: 'this is title', // 设置 webview 标题，类似 html 中的 <title>this is title</title>
      name: 'demo', // entry 的名字，即 entry.tsx 所在的文件夹的名字
    }
  )
}
