const system = require('../model/system')
const Collection = require('../model/collection/index')
const initTreeview = require('../view/treeview')
const initCommand = require('../command')
const noty = require('../../lib/vscode-utils/noty')

async function init() {
  // 注册命令
  initCommand()

  if(system.newInstall()) {
    console.log('first install')
    await system.save({
      version: '0.0.0'
    })
  }
  
  // 检查数据
  Collection.instances.forEach(ins => {
    const data = ins.getAll()
    try {
      ins.validate(data)
    } catch(e) {
      noty.fatal('数据校验失败')
      console.error('数据校验失败', data)
      throw e
    }
  })

  const systemInfo = system.getAll()
  console.log('system info', systemInfo)

  // 左侧的 treeview
  initTreeview()
}

module.exports = init