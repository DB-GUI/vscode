export default function Noty(request) {
  return new Proxy({}, {
    get(target, type) {
      return msg => request('noty', { type, msg })
    }
  })
}