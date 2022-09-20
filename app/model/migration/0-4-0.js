module.exports = async function(state) {
  const { version } = state.get('system')
  if(version === '0.0.0') {
    console.log('migrating from 0.0.0 to 0.4.0')
    // 更新版本号
    await state.update('system', {
      version: '0.4.0'
    })

    // 数据存储切换到 @ppzp/bd
    // 原主键名 id 改为 _id
    const connections = state.get('connection')
    for(let conn of connections) {
      conn._id = conn.id
      delete conn.id
    }
    await state.update('connection', connections)
  }
}