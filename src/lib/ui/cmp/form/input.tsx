import { State } from '../../oo'
import './index.styl'

interface InputProps {
  state: State<string>
}

export
function Input({ state }: InputProps) {
  return <input
    className = 'basic_input'
    value = {state.value}
    onChange = {e =>
      state.set(e.currentTarget.value)
    }
  />
}
