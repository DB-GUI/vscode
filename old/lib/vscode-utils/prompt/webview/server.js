import prompt from '../index'

export default function(data) {
  return prompt.simple[data.type](data.title, data.subtitle, data.btns)
}