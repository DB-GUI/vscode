export
const logger = new Proxy(console, {
  get: (_, type: 'debug' | 'error') =>
    (...args: any[]) =>
      console[type]('PPz.vscode', ...args)
})
