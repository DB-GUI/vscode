import cp from 'child_process'
import { get as getContext } from '@ppzp/context'
import vscode from 'vscode'

import Feifei from '../webview/feifei.js'
import noty from '../../lib/vscode-utils/noty/index.js'
import { warn } from '../../lib/vscode-utils/prompt/confirm'

export
async function empty() {
  if(await warn(vscode.l10n.t('checkToDeleteAllData'), vscode.l10n.t('thisOperationWillDeleteAllPPZData'), vscode.l10n.t('confirmToClear')))
    return
  const keys = getContext().globalState.keys()
  await Promise.all(
    keys.map(key =>
      getContext().globalState.update(key, undefined)
    )
  )
  noty.info(vscode.l10n.t('dataCleared'))
}

export
function github() {
  cp.exec('start https://github.com/ppz-pro/ppz.vscode')
}

export
function love() {
  new Feifei()
}