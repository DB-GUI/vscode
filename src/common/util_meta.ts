const key = 'ppz'
const name = 'PPz'

export default {
  key,
  name,
  key_and: (str: string) => key + str,
  name_and: (str: string) => name + str,
  l10n: (str: string) => `%${key}.${str}%`,
  icon: (name: string) => `$(${name})`,
}
