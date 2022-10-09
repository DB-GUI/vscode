// copy dependencies from old version

import { get as getContext } from '@ppzp/context'
import FS from 'fs/promises'
import Path from 'path'

const old = [
  '0.5.0'
]

export default
async function copyDependencies() {
  console.debug('copying dependencies')
  const path = getContext().extensionPath
  const currentTarget = Path.join(path, 'node_modules')
  console.debug('current', currentTarget)

  // 判断是否已有依赖
  try {
    await FS.access(currentTarget)
    console.debug('current found')
    return true // 已有依赖
  } catch {
    console.debug('current not found')
  }
  
  for(let version of old) {
    try {
      const target = Path.join(path, '../ppz.ppz-' + version, 'node_modules')
      console.debug('trying', target)
      await FS.cp(target, currentTarget, {
        recursive: true
      })
      console.debug(version, 'found, dependencies copied')
      return true
    } catch(err) {
      console.debug('not found', err)
      // 没找到 node_modules，应该是没有
    }
  }

  return false
}