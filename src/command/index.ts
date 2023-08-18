import { commands } from 'vscode'
import list_command from './all'

export default function() {
  list_command.forEach(command => {
    commands.registerCommand(command.register.command, command.exec)
  })
}
