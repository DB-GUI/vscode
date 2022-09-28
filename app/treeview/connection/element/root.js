import vscode from 'vscode'
import connectionService from '../../../service/connection'
import { checkInstall } from '../../../service/install-sqlite3'
import { TreeviewElement } from './base'
import { MysqlElement } from './adapter/mysql'
import { Sqlite3Element } from './adapter/sqlite3'
import { PgsqlElement } from './adapter/pgsql'
import { MssqlElement } from './adapter/mssql'

export default
class RootElement extends TreeviewElement {
  constructor(updateEvent) {
    super({
      updateEvent,
      name: 'root'
    })
  }

  async getChildren() {
    const list = await super.getChildren()
    if(list.some(item => item.options.client === 'sqlite3'))
      checkInstall()
    return list
  }

  _getChildren() {
    return connectionService.getAll().map(
      options => getConEl(this, options)
    )
  }
  refresh() {
    if(this._children) {
      for(const child of this._children)
        child.close()
      this._children = null
      this.updateEvent.fire()
    }
  }

  addChild(options, connect) {
    const child = getConEl(this, options)
    child.collapse = vscode.TreeItemCollapsibleState[connect?'Expanded':'Collapsed']
    this._children.push(child)
    this.updateEvent.fire()
  }
  updateChild(options, connect) {
    // 更新入口在 treeview，此时 treeview 一定展开过，this._children 一定存在
    const index = this._children.findIndex(conn => conn.options._id === options._id)
    this._children[index].close()
    const newChild = getConEl(this, options)
    newChild.collapse = vscode.TreeItemCollapsibleState[connect?'Expanded':'Collapsed']
    this._children.splice(index, 1, newChild)
    this.updateEvent.fire()
  }
  dropChild(el) {
    const index = this._children.indexOf(el)
    this._children.splice(index, 1)
    this.updateEvent.fire()
  }
}

function getConEl(that, options) {
  // PPZ_ADAPTER
  const Klass = {
    mysql: MysqlElement,
    sqlite3: Sqlite3Element,
    postgresql: PgsqlElement,
    cockroachdb: PgsqlElement,
    mssql: MssqlElement,
  }[options.client]
  if(!Klass)
    throw Error('未知的连接类型')
  return new Klass(that, options)
}