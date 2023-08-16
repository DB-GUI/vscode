import vscode from 'vscode'

async function untitledFile(content, language) {
  const doc = await vscode.workspace.openTextDocument({
    content, language
  })
  vscode.window.showTextDocument(doc)
}

export default
new Proxy(untitledFile, {
  get(target, language) {
    return function(...content) {
      return untitledFile(content.join(''), language)
    }
  }
})