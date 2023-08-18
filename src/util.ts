export
const logger = new Proxy(console, {
  get: (_, type) =>
    (...args) =>
      console[type]('PPz.vscode', ...args)
})

export
const meta_util = function() {
  const key = 'ppz'
  const name = 'PPz'
  return {
    key,
    name,
    key_and: (str) => key + str,
    name_and: (str) => name + str,
    l10n: (str) => `%${key}.${str}%`,
  }
}()
