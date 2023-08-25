import { createRoot } from 'react-dom/client'
import make_client from '@/lib/webview_request/client'

export
function render_root(Root) {
  createRoot(document.getElementById('react_root')).render(
    <Root
      request = {
        new Proxy(
          make_client(
            function() {
              let id = 1
              return () => PPz.id + id++
            }()
          ),
          {
            get(request, key_handler) {
              return post => request(key_handler, post)
            }
          }
        )
      }
    />
  )
}
