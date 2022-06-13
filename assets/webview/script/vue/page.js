import { $ } from '../../../../lib/dom/index.js'
import Page from '../page.js'
import { createApp } from './vue.esm-browser.prod.js'

export default
class VuePage extends Page {
  init(page) {
    const [$mounter, options] = this.initVue(page)
    options.updated = function() {
      page.saveState()
    }
    createApp(options).mount($mounter)
    $('body').append($mounter)
  }
}