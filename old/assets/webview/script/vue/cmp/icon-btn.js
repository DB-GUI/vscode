export const name = 'icon-btn'

export const options = {
  props: ['iid'],
  template: `
    <button class="icon-btn">
      <ppz-icon :iid="iid" />
    </button>
  `
}

export const style = `
  button.icon-btn {
    font-size: 1em;
    line-height: 2;
    padding: 0 0.5em;
    min-width: auto;
  }
  button.icon-btn.round {
    border-radius: 50%;
  }
`