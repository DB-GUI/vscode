import request from '../request.js'

export default function selectFile(options) {
  return request('selectFile', options, {
    timeout: 0
  })
}