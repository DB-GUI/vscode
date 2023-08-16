export const name = 'ppz-hr'

export const options = {
  template: `<div class="ppz-hr"><slot /></div>`,
}

export const style = `
  .ppz-hr {
    display: flex;
    align-items: center;
    margin: 1em;
  }
  .ppz-hr::before, .ppz-hr::after {
    display: block;
    content: '';
    flex: 1;
    height: .1px;
    background-color: rgba(var(--color1), .3);
    margin: 2em;
  }
`