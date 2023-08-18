export
const logger = new Proxy(console, {
  get: (_, type) =>
    (...args) =>
      console[type]('PPz.vscode', ...args)
})
