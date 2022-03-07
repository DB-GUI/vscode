const vscode = require('vscode')

/** @param {vscode.ExtensionContext} context */
exports.activate = function(context) {
  console.debug('dbms-gui activating')
  
  console.debug('dbms-gui activated')
}

exports.deactivate = function() {
  console.debug('dbms-gui deactivated')
}