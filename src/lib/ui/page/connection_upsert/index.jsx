import { useState } from 'react'
import { Input } from '../../cmp/form/input'
import { State } from '../../oo'

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
        </div>
      </div>
    </div>
  </div>
}
