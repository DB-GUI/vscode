export const name = 'ppz-icon'

export const options = {
  props: ['iid'], // IconID
  template: '<svg class="icon" aria-hidden="true" v-html="content"></svg>',
  computed: {
    content() {
      return `<use xlink:href="#icon-${this.iid}"></use>`
    }
  }
}