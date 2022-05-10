export default function Noty(request) {
  return new Proxy({}, {
    get(target, type) {
      return (msg, ...btns) => request('noty', { type, msg, btns }, 0)
    }
  })
}