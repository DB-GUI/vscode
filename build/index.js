import * as FS from 'fs'
import { build } from 'esbuild'

import build_meta from './meta'
import get_core_options from './core'
import get_ui_options from './ui'

// 开发模式
const is_dev = true

async function main() {
  const time_started = new Date()
  // 1. 创建 dist 文件夹
  make_dir_dist()
  // 2. meta
  console.log('\n\nbuilding meta...')
  await build_meta()
  // 3. core
  console.log('\n\nbuilding core...')
  await build(get_core_options(is_dev))
  // 4. ui
  console.log('\n\nbuilding ui...')
  await build(await get_ui_options(is_dev))

  console.log('\n\n all done in', new Date() - time_started, 'ms')
}
main()

function make_dir_dist() {
  let made_dist = false
  try {
    FS.rmSync('dist', {
      recursive: true
    })
    made_dist = true
  } catch(err) {
    console.debug('未删除老 dist')
    // console.error(err)
  }
  FS.mkdirSync('dist')
}
