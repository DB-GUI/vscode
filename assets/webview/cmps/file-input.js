import { Form, El, Button } from '../../../lib/dom/index.js'
import selectFile from '../../../lib/vscode-utils/file-selector/client.js'

export default
class extends Form.Input {
  getEl() {
    const $input = this._$input = El('input')
    const $btn = Button('···', async () => {
      const file = await selectFile()
      if(!file) return
      this._value = file[0].path
      this._setInput()
      this._emitChange()
    })
    $input.oninput = e => {
      this._value = e.target.value
      this._emitChange()
    }
    return El('span', 'file-input', [
      $input,
      $btn
    ])
  }

  _setInput() {
    this._$input.value = this._value
  }
}