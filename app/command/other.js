import cp from 'child_process'
import { get as getContext } from '@ppzp/context'

import Wechat from '../webview/wechat.js'
import Feifei from '../webview/feifei.js'
import noty from '../../lib/vscode-utils/noty/index.js'
import { warn } from '../../lib/vscode-utils/prompt/confirm'

export
async function empty() {
  if(await warn('确认清除所有数据吗？', '此操作将清除全部 ppz 数据', '确认清除'))
    return
  const keys = getContext().globalState.keys()
  await Promise.all(
    keys.map(key =>
      getContext().globalState.update(key, undefined)
    )
  )
  noty.info('数据已清空，请重启 vscode')
}

export
function github() {
  cp.exec('start https://github.com/ppz-pro/ppz.vscode')
}

export
function wechat() {
  new Wechat()
}

export
function love() {
  new Feifei()
}