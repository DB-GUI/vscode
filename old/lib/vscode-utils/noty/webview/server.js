import noty from '../index'

export default
function({ type, msg, btns }) {
  const result = noty[type](msg, btns)
  if(btns.length)
    return result
}