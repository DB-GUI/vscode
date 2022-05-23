const noty = require('../../lib/vscode-utils/noty')
const warn = require('../../lib/vscode-utils/prompt/confirm').warn

exports.empty = async function() {
  if(await warn('确认清除所有数据吗？', '此操作将清除全部 ppz 数据', '确认清除'))
    return
  const keys = Context.globalState.keys()
  await Promise.all(
    keys.map(key =>
      Context.globalState.update(key, undefined)
    )
  )
  noty.info('数据已清空，请重启 vscode')
}