import $ from '../script/ppz-query.js'
import twb from '../script/two-way-data-binding.js'
const vscode = acquireVsCodeApi()

const data = twb('form').subject
$('form').onsubmit = function(evt) {
  switch(evt.submitter.id) {
    case 'connect':
      connect()
    case 'save':
      save()
  }
  evt.preventDefault()
  vscode.postMessage({
    type: 'dispose'
  })
}

function connect() {
  console.debug('连接...')
  vscode.postMessage({
    type: 'connect',
    data
  })
}

function save() {
  console.debug('保存连接')
  vscode.postMessage({
    type: 'save',
    data
  })
}