import { get as getContext } from '@ppzp/context'
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
    const result = await noty.warn('未安装 sqlite3 驱动，你需要先安装，才可以连接 sqlite3 数据库', ['安装指引'])
    if(result == '安装指引')
      new InstallSqlite3Webview()
  }
}