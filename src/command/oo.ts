import { meta_util } from 'src/util'

export
class Register {
  command: string
  title: string
  icon: string
  category = meta_util.name
  constructor(command: string, title: string, icon: string) {
    this.command = meta_util.key_and(command)
    this.title = title
    this.icon = meta_util.icon(icon)
  }
}
