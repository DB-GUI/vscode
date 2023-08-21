import { writeFileSync } from 'fs'

export default async function() {
  const list = await Promise.all(
    [
      'zh-cn',
      'en',
    ].map(async name => ({
      name,
      data: await import('asset/l10n/' + name + '.ts')
    }))
  )
  for(const { name, data } of list) {
    writeFileSync(
      `dist/package.nls.${name == 'en'?'':(name + '.')}json`,
      JSON.stringify(flat(data.contribution), null, 2)
    )
  }
}

function flat(data, prefix = 'ppz.', result = {}) {
  for(const key in data)
    if(typeof data[key] == 'string')
      result[prefix + key] = data[key]
    else
      flat(data[key], prefix + key + '.', result)
  return result
}
