export const name = 'ppz-nav'

export const options = {
  template: `
    <nav>
      <template v-for="(name, index) in names">
        <span>{{name}}</span>
        <ppz-icon v-if="index + 1 < names.length" id="arrow-right"></ppz-icon>
      </template>
    </nav>
  `,
  data() {
    return {
      names: PPZ.initData.names
    }
  }
}

export const style = `
  header nav{
    padding: .38em var(--padding-h);
  }
  header nav span {
    font-size: .9em;
  }
  header nav svg {
    margin: 0 .3em;
  }
`