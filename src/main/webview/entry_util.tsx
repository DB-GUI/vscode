import React from 'react'
import { createRoot } from 'react-dom/client'

export
function render_root(Root: React.FunctionComponent) {
  createRoot(document.getElementById('react_root') as HTMLElement)
  .render(<Root />)
}
