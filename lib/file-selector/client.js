export default function(request) {
  return function(options) {
    return request('selectFile', options)
  }
}