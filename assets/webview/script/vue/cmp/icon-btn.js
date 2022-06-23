export const name = 'icon-btn'

export const options = {
  props: ['iid'],
  template: `
    <button class="reset-style icon-btn">
      <ppz-icon :iid="iid" />
    </button>
  `
}

export const style = `
  button.icon-btn {
    font-size: 1em;
    line-height: 2;
    padding: 0 0.58em;
    min-width: auto;
  }
`