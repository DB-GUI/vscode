import vscode from 'vscode'

export default new Proxy({
  info: vscode.window.showInformationMessage,
  warn: vscode.window.showWarningMessage,
  error: vscode.window.showErrorMessage,
  fatal: (msg, btns) => vscode.window.showErrorMessage('[BUG] ' + msg, btns)
}, {
  get(target, method) {
    return (msg, btns = []) => target[method]('[PPZ] ' + msg, ...btns)
  }
})