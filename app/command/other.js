const { noty } = require('../utils')

exports.empty = async function() {
  const keys = Context.globalState.keys()
  await Promise.all(
    keys.map(key =>
      Context.globalState.update(key, undefined)
    )
  )
  noty.info('数据已清空，请重启 vscode')
}