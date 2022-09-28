const Path = require('path')
const FS = require('node:fs/promises')
const esbuild = require('esbuild')
const packageJson = require('../package.json')

;(async function package() {
  // 打包类型
  const buildType = process.argv[2]
  if(buildType != 'dev' && buildType != 'pro')
    throw Error('error build type: ' + buildType)
  console.log('build type:', buildType)

  // 删除旧目录
  const dir = p('../dist')
  try {
    await FS.rm(dir, {
      recursive: true,
      force: true
    })
    console.log('删除老文件')
  } catch(err) {
    console.log('未检测到老文件或...', err)
  }
  await FS.mkdir(dir)
  console.log('创建目录', dir)

  // webview
  await cp('assets')
  // lib
  await cp('lib')
  // doc
  await cp('CHANGELOG.md')
  await cp('LICENSE')
  await cp('README.md')
  console.log('copy assets, changelog, license, readme')

  // package.json
  delete packageJson.devDependencies
  delete packageJson.dependencies
  await FS.writeFile(p('../dist/package.json'), JSON.stringify(packageJson))
  console.log('write package.json')

  // .ignore
  await FS.writeFile(p('../dist/.vscodeignore'), `
    *.vsix
    *.js.map
  `)
  console.log('write .vscodeignore')

  // 打包 extension.js
  await esbuild.build({
    watch: buildType == 'dev',
    minify: buildType == 'pro',
    entryPoints: [p('../app/extension.js')],
    bundle: true,
    sourcemap: true,
    external: [
      'vscode',
      'sqlite3',
      'oracledb', 'mysql', 'better-sqlite3', 'pg-query-stream',
      'pg-native', 'mock-aws-s3', 'aws-sdk', 'nock'
    ],
    platform: 'node',
    outfile: p('../dist/extension.js'),
  })
  console.log('打包成功，非 app 目录的文件发生改动时，要重启此命令！！！')
})()

// 工具
function p(target) { // 获取绝对路径
  return Path.join(__dirname, target)
}
async function cp(from) { // 复制
  const to = '../dist/' + from
  from = '../' + from
  await FS.cp(p(from), p(to), {
    recursive: true
  })
}