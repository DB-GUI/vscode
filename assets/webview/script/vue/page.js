import { $ } from '../../../../lib/dom/index.js'
import Page from '../page.js'
import { createApp } from './vue.esm-browser.prod.js'
import FileInput from './file-input.js'

export default
class VuePage extends Page {
  init(page) {
    const [$mounter, options] = this.initVue(page)

    options.updated = function() {
      page.saveState()
    }
    const app = createApp(options)
    app.component('file-input', FileInput)
    app.mount($mounter)

    $('body').append($mounter)
  }
}