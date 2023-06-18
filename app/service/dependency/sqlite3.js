import { get as getContext } from '@ppzp/context'
import vscode from 'vscode'
import FS from 'fs/promises'
import Path from 'path'
import noty from '../../../lib/vscode-utils/noty/index'
import InstallSqlite3Webview from '../../webview/install-sqlite3'

export
async function checkInstall() {
  const ep = getContext().extensionPath
  try {
    await FS.access(Path.join(ep, 'node_modules/sqlite3/LICENSE'))
  } catch(err) {
    console.warn('未安装 sqlite3 驱动')
    const result = await noty.warn(vscode.l10n.t('sqlite3DriverIsNotInstalled'), [vscode.l10n.t('installGuide')])
    if(result == vscode.l10n.t('installGuide'))
      new InstallSqlite3Webview()
  }
}