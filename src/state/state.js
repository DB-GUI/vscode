module.exports =
class State {
  constructor(state, key) {
    this.state = state
    this.key = key
  }

  get(default_value) {
    return this.state.get(this.key, default_value)
  }
  async save(value) {
    return await this.state.update(this.key, value)
  }
}
