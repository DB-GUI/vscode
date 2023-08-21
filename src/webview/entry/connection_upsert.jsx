import React from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('react_root'))
.render(<App />)

function App() {
  return <h1>hello</h1>
}
