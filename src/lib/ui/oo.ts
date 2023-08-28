import { ReactNode } from 'react'

export
interface Props {
  className?: string
  children?: ReactNode
}

export
class State<Value> {
  constructor(
    public value: Value,
    public set: (value: Value) => void,
  ) {}
}
