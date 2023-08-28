import { cns } from '../../../common/util'
import { Props } from '../../../oo'
import './index.styl'

interface ButtonProps extends Props {
  onClick(): void
}

export
function Button({ className, onClick, children }: ButtonProps) {
  return <button
    className = {cns('btn', className)}
    onClick = {onClick}
  >
    {children}
  </button>
}
