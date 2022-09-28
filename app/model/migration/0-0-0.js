module.exports = async function(state) {
  const systemInfo = state.get('system')
  if(systemInfo === undefined) {
    console.log('migrating from scratch to 0.0.0')
    await state.update('system', {
      version: '0.0.0'
    })
  }
}