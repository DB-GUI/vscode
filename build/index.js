const Path = require('path')
const FS = require('node:fs/promises')
const esbuild = require('esbuild')
const packageJson = require('../package.json')

;(async function package() {
  // 打包类型
  const buildType = process.argv[2]
  if(buildType != 'dev' && buildType != 'pro')
    throw Error('error build type: ' + buildType)

  // 删除旧目录
  const dir = p('../dist')
  try {
    await FS.rm(dir, {
      recursive: true,
      force: true
    })
    console.log('删除老文件')
  } catch(err) {
    console.log('未检测到老文件或没有权限')
  }
  await FS.mkdir(dir)

  // webview
  await cp('assets')
  // lib
  await cp('lib')
  // doc
  await cp('CHANGELOG.md')
  await cp('LICENSE')
  await cp('README.md')

  // package.json
  delete packageJson.devDependencies
  delete packageJson.dependencies
  packageJson.dependencies = {
		"sqlite3": "^5.1.1",
  }
  await FS.writeFile(p('../dist/package.json'), JSON.stringify(packageJson))

  // fake sqlite3
  await FS.mkdir(p('../dist/node_modules/sqlite3'), {
    recursive: true
  })
  await FS.writeFile(p('../dist/node_modules/sqlite3/package.json'), `
    {
      "name": "sqlite3",
      "description": "Asynchronous, non-blocking SQLite3 bindings",
      "version": "5.1.1",
      "homepage": "https://github.com/TryGhost/node-sqlite3",
      "author": {
        "name": "Mapbox",
        "url": "https://mapbox.com/"
      },
      "files": [
        "index.js"
      ],
      "main": "./index.js"
    }
  `)
  await FS.writeFile(p('../dist/node_modules/sqlite3/index.js'), '"ppz"')

  // .ignore
  await FS.writeFile(p('../dist/.vscodeignore'), `
    node_modules
    *.vsix
    *.js.map
  `)

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