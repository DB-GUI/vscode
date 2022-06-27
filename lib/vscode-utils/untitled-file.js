const vscode = require('vscode')

async function untitledFile(content, language) {
  const doc = await vscode.workspace.openTextDocument({
    content, language
  })
  vscode.window.showTextDocument(doc)
}

module.exports = new Proxy(untitledFile, {
  get(target, language) {
    return function(...content) {
      return untitledFile(content.join(''), language)
    }
  }
})