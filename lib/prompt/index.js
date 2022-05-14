const vscode = require('vscode')

const map = {
  info: vscode.window.showInformationMessage,
  warn: vscode.window.showWarningMessage,
  error: vscode.window.showErrorMessage
}

// btns 不给默认值：如果不需要 btns 应明确空数组
function simplePrompt(type, title, subtitle, btns) {
  return map[type](title, {
    detail: subtitle,
    modal: true
  }, ...btns)
}
const simple = new Proxy(map, {
  get(map, type) {
    return (title, subtitle, btns) => simplePrompt(type, title, subtitle, btns)
  }
})

async function prompt(type, title, subtitle, btns) {
  const result = await simplePrompt(type, title, subtitle, Object.keys(btns))
  if(result !== undefined) {
    btns[result]()
    return result
  }
}

module.exports = new Proxy(map, {
  get(map, type) {
    return type == 'simple'
      ? simple
      : (title, subtitle, btns) => prompt(type, title, subtitle, btns)
  }
})