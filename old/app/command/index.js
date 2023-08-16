import vscode from 'vscode'
import connection from './connection'
import * as other from './other'
import { get as getContext } from '@ppzp/context'

function registerCommand(name, handler) {
  // console.debug('注册 command', name)
  getContext().subscriptions.push(
    vscode.commands.registerCommand('ppz.' + name, function() {
      console.debug('执行 command', name)
      return handler(...arguments)
    })
  )
}

export default function() {
  ;[
    connection,
    other
  ]
  .flatMap(
    module => Object.entries(module)
  )
  .map(
    ([ name, handler ]) => registerCommand(name, handler)
  )
}