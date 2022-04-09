export default function($) {

  $.El = function(tagname, className, children) {
    /** @type {HTMLElement} */
    const $el = document.createElement(tagname)
    if(className)
      $el.className = className
    if(children)
      $el.append(...children)
    return $el
  }

  $.Div = function(className, children) {
    return $.El('div', className, children)
  }

  $.Span = function(txt, className = '') {
    return $.El('span', className, [txt])
  }

  $.Icon = function(id) {
    const wrapper = $.Div()
    wrapper.innerHTML = `
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-${id}"></use>
      </svg>
    `
    return wrapper.children[0]
  }

  function th(th) {
    return typeof th == 'string'
      ? $.El('th', '', [th])
      : th
  }
  $.THead = function(fields) {
    return $.El('thead', '', [
      $.El('tr', '', fields.map(th))
    ])
  }
  
  function td(td) {
    return typeof td == 'string'
      ? $.El('td', '', [td])
      : td
  }
  $.TR = function(row) {
    return $.El('tr', '', row.map(td))
  }
  $.TBody = function(data) {
    return $.El('tbody', '', 
      data.map(record => $.TR(record))
    )
  }
  $.Table = class {
    constructor(fields = [], data = []) {
      this.$el = $.El('table', '', [
        $.THead(fields),
        $.TBody(data)
      ])
    }
    tbody(data) {
      const current = this.$el.querySelector('tbody')
      if(data) {
        const newDom = $.TBody(data)
        current.replaceWith(newDom)
        return newDom
      } else {
        return current
      }
    }
    thead(fields) {
      const current = this.$el.querySelector('thead')
      if(fields) {
        const newDom = $.THead(fields)
        console.debug('thead replaced with', newDom)
        current.replaceWith(newDom)
        return newDom
      } else {
        return current
      }
    }
  }
}