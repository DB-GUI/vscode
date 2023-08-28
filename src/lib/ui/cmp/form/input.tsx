import { cns } from '../../common/util'
import { State, Props } from '../../oo'

interface InputProps extends Props {
  state: State<string>
}

export
function Input({ state, className }: InputProps) {
  return <input
    className = {cns('basic_input', className)}
    value = {state.value}
    onChange = {e =>
      state.set(e.currentTarget.value)
    }
  />
}
