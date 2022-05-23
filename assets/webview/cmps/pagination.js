import { Input, Button as _Button, Div, Span } from '../../../lib/dom/index.js'
import Icon from './icon/index.js'

export const config = {
  size: 16
}

export default function Pagination({
  size = config.size,
  index = 1,
  count = 0,
  onChange
}) {
  if(!isUnsignedInt(size))
    throw Error('invalid size: ' + size)
  checkCount(count)
  if(!(isUnsignedInt(index) && index <= pageSum()))
    throw Error('invalid index: ' + index)

  let initSize = size
  const refresh = () => onChange({ index, size })

  const $sizeInput = Input() // 值的改变来源于：输入
  $sizeInput.value = size
  $sizeInput.oninput = function() {
    const value = $sizeInput.value
    if(!/^\d*$/.test(value)) { // 过滤不合法输入
      $sizeInput.value = size
      return
    }
    size = value // size 仅用来存放上次的有效输入
  }
  $sizeInput.onblur = function() {
    size = parseInt(size)
    if(isNaN(size) || size == 0) {
      size = initSize
      $sizeInput.value = size
    }
    refreshIndex()
    refreshDisabled()
  }

  const $indexInput = Input() // 值的改变来源于：输入，按钮
  $indexInput.value = index
  $indexInput.oninput = function() { // 处理输入值
    const value = $indexInput.value
    if(!/^\d*$/.test(value)) {
      $indexInput.value = index
      return
    }
    index = value
  }
  $indexInput.onblur = function() {
    index = parseInt(index)
    if(isNaN(index) || index == 0) {
      index = 1
      $indexInput.value = index
    }
    refreshIndex()
    refreshDisabled()
  }

  const Button = (big, icon, title, onclick) => {
    const btn = _Button([Icon(icon)], onclick)
    if(big)
      btn.classList.add('big')
    btn.title = title
    return btn
  }
  const $leftBtn = Button(true, 'arrow-left', '上一页', () => onclickNav(index - 1))
  const $rightBtn = Button(true, 'arrow-right', '下一页', () => onclickNav(index + 1))
  const $leftBtn2 = Button(true, 'arrow-left2', '第一页', () => onclickNav(1))
  const $rightBtn2 = Button(true, 'arrow-right2', '最后一页', () => onclickNav(pageSum()))
  refreshDisabled()

  function onclickNav(i) { // 处理按钮
    if(i < 1 || i > pageSum()) return
    index = i
    $indexInput.value = index
    refreshDisabled()
    refresh()
  }
  function checkCount(value) {
    if(!(isInt(value) && value >=0))
      throw Error('invalid count: ' + value)
  }
  function pageSum() {
    return Math.ceil(count / size) || 1 // 当 result 为 0 时，设为 1
  }
  function refreshDisabled() {
    if(index <= 1) {
      $leftBtn.disabled = true
      $leftBtn2.disabled = true
    } else {
      $leftBtn.disabled = false
      $leftBtn2.disabled = false
    }
    if(index >= pageSum()) {
      $rightBtn.disabled = true
      $rightBtn2.disabled = true
    } else {
      $rightBtn.disabled = false
      $rightBtn2.disabled = false
    }
  }
  function refreshIndex() {
    const _pageSum = pageSum()
    if(index > _pageSum) {
      index = _pageSum
      $indexInput.value = index
    }
  }

  return {
    // data: () => ({ size, index }), size 和 index 有时并不合法，外层组件应保留每次 onChange 的结果
    setCount(value) {
      checkCount(value)
      count = value
      refreshDisabled()
    },
    $el: Div('ppz-pagination', [
      Button(false, 'refresh', '刷新页', refresh),
      $sizeInput,
      Span(' 条记录 / 页'),
      $leftBtn2,
      $leftBtn,
      $indexInput,
      $rightBtn,
      $rightBtn2
    ])
  }
}

function isInt(target) {
  return typeof target == 'number' && !isNaN(target)
    && target % 1 == 0
}

function isUnsignedInt(target) {
  return isInt(target) && target > 0
}