import TerminalWebview from '../ppz-terminal'

export default
function makeOpenTerminal(connection) {
  return {
    openTerminal(sql) {
      new TerminalWebview(connection, sql)
    }
  }
}