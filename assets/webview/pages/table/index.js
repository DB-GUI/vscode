import VuePage from '../../script/vue/page.js'
import * as Nav from './nav.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        selectParams: {
          page: {
            count: 0,
            size: 16,
            index: 1
          }
        }
      }
    },
    methods: {
      refresh() {
        console.log('refreshing')
      }
    }
  }
}, Nav)