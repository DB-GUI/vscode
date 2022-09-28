import vscode from 'vscode'

export default
function selectFile({
  canSelectFiles = true,
  canSelectMany = false,
  openLabel = '选择',
  title = '选择文件'
} = {}) {
  return vscode.window.showOpenDialog({
    canSelectFiles,
    canSelectMany,
    openLabel,
    title
  })
}