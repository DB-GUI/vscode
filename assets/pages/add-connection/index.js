import $ from '../script/ppz-query.js'
import twb from '../script/two-way-data-binding.js'
const vscode = acquireVsCodeApi()

const data = twb('form').subject

$('form').onsubmit = function(evt) {
  switch(evt.submitter.id) {
    case 'connect':
      save(true)
      break
    case 'save':
      save()
      break
  }
  evt.preventDefault()
  vscode.postMessage({
    type: 'dispose'
  })
}

function save(connect) {
  console.debug('保存连接', { connect })
  vscode.postMessage({
    type: 'save',
    data: {
      connect,
      connection: data
    }
  })
}