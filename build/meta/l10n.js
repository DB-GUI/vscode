const FS = require('fs')
const list = [
  'zh-cn',
  'en',
].map(name => ({
  name,
  data: require('../../src/l10n/' + name).contribution
}))

module.exports = function() {
  for(const { name, data } of list)
    FS.writeFileSync(
      `dist/package.nls.${
        name == 'en' && '' // 英文不需要 en.
        || (name + '.')
      }json`,
      JSON.stringify(flat(data), null, 2)
    )
}

function flat(data, prefix = 'ppz.', result = {}) {
  for(const key in data)
    if(typeof data[key] == 'string')
      result[prefix + key] = data[key]
    else
      flat(data[key], prefix + key + '.', result)
  return result
}
