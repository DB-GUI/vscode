import { join } from 'path'
import { ExtensionContext, WebviewPanel, window, ViewColumn, Uri } from 'vscode'
import { meta_util } from '@/util'
import { All_state } from '@/state/oo'

interface Webview_context {
  ext_context: ExtensionContext
  state: All_state
}

export
class Webview_wrapper {
  context: Webview_context
  panel: WebviewPanel
  constructor(context: Webview_context, html: string) {
    this.context = context
    this.panel = window.createWebviewPanel(
      meta_util.name,
      'test',
      ViewColumn.One,
      {
        localResourceRoots: [this.get_uri('1')],
        enableScripts: true
      }
    )
    this.panel.webview.html = html
    this.panel.iconPath = {
      light: this.get_uri('asset/icon/black.svg'),
      dark: this.get_uri('asset/icon/white.svg')
    }
  }

  get_path(relative_path: string) {
    return join(this.context.ext_context.extensionPath, relative_path)
  }
  get_uri(relative_path: string) {
    return Uri.file(this.get_path(relative_path))
  }
}
