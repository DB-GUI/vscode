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
    padding: 0 0.5em;
    min-width: auto;
  }
  button.icon-btn.primary {
    background-color: var(--vscode-button-background);
  }
  button.icon-btn.primary:hover {
    background-color: var(--vscode-button-hoverBackground);
  }
  button.icon-btn.round {
    border-radius: 50%;
  }
`