export default {
  props: ['id'],
  template: '<svg class="icon" aria-hidden="true" v-html="content"></svg>',
  computed: {
    content() {
      return `<use xlink:href="#icon-${this.id}"></use>`
    }
  }
}