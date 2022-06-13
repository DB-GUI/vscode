import { Form, El, Button } from '../../../lib/dom/index.js'
import selectFile from '../../../lib/vscode-utils/file-selector/client.js'

export default
class extends Form.Input {
  getEl() {
    const $input = this._$input = El('input')
    $input.oninput = e => {
      this._value = e.target.value
      this._emitChange()
    }
    $input.onfocus = () => this._selectFile()
    const $btn = Button('···', () => this._selectFile())
    const $el = El('span', [
      $input,
      $btn
    ])
    $el.className = 'file-input'
    return $el
  }

  async _selectFile() {
    const file = await selectFile()
    if(!file) return
    this._value = file[0].path
    this._setInput()
    this._emitChange()
  }

  _setInput() {
    this._$input.value = this._value
  }
}