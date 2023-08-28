export
class State<Value> {
  constructor(
    public value: Value,
    public set: (value: Value) => void,
  ) {}
}
