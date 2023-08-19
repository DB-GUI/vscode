export
const logger = new Proxy(console, {
  get: (_, type: 'debug' | 'error') =>
    (...args: any[]) =>
      console[type]('PPz.vscode', ...args)
})

export
const meta_util = function() {
  const key = 'ppz'
  const name = 'PPz'
  return {
    key,
    name,
    key_and: (str: string) => key + str,
    name_and: (str: string) => name + str,
    l10n: (str: string) => `%${key}.${str}%`,
    icon: (name: string) => `$(${name})`,
  }
}()
