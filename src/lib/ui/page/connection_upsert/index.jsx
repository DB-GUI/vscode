import { useState } from 'react'
import { Input, Button } from '../../cmp/form'
import { State } from '../../oo'
import './index.styl'

export default
function Connection_upsert({ request }) {
  const [value_name, set_name] = useState('')
  
  return <div className = 'page_connection_upsert'>
    <div className = 'wrapper'>
      <h1>Upsert Connection</h1>
      <div className = 'field_container'>
        <div className = 'field'>
          <div className = 'key'>name</div>
          <Input
            state = {new State(value_name, set_name)}
          />
          <Button>test</Button>
        </div>
      </div>
    </div>
  </div>
}
