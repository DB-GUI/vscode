import vscode from 'vscode'
import Knex from 'knex'
import noty from '../../../lib/vscode-utils/noty'
import untitledFile from '../../../lib/vscode-utils/untitled-file'

export
class KnexConnection {
  get clientName() { throw Error('未定义 clientName') }
  get driveName() { throw Error('未定义 driveName') }
  constructor(id, name, connection, useNullAsDefault) {
    this.id = id
    this.name = name
    this.options = connection
    console.debug('constructing connection', connection)
    this.client = Knex({
      client: this.driveName,
      connection,
      useNullAsDefault,
      acquireConnectionTimeout: 10000,
      pool: { min: 0, max: 1 }
    })
  }
  
  async fieldList(schemaName, tableName) {
    const fields = await this._fieldList(schemaName, tableName)
    this.fields = fields // 保存最新的 fields
    return fields
  }

  /**
   * 统一原始类型  
   * + datetime: 不带时区的时间类型；需要：格式化显示
   * + datetime-ts: 带时区的时间类型，有时区问题；需要：格式化显示、处理输入时差
   *   + 取：数据库原始数据 -> Node Date 类（驱动已处理好）-> 字符串
   *   + 存：字符串 -> Node Date 类（开发者处理）-> 数据库原始数据（即不能“直接把字符串发给数据库”）
   */
  ppzType(rawType) {
    console.warn('不需要统一类型？')
  }

  formatInput(records) {
    const dateNames = this.fields
      .filter(f => f.ppzType == 'datetime-ts')
      .map(f => f.name)
    for(let record of records)
      for(let name of dateNames)
        if((record[name] !== '') && (typeof record[name] == 'string'))
          record[name] = new Date(record[name])
  }

  getTarget(schema, table) {
    return '`' + schema + '`.`' + table + '`'
  }

  getCount(count) {
    return count[0]['count(*)']
  }
  async select(schema, table, params) {
    const records = await this._queryBuilder2(schema, table, params)
    const count = await this._queryBuilder(schema, table).count()
    return {
      records,
      count: this.getCount(count)
    }
  }
  selectSQL(schema, table, params) {
    return this._queryBuilder2(schema, table, params).toString() + ';'
  }

  async insert(db, tb, record) {
    this.formatInput([record])
    return await this._queryBuilder(db, tb).insert(record)
  }

  _queryBuilder(schema, table) {
    if(schema)
      table = schema + '.' + table
    return this.client.from(table)
  }

  _queryBuilder2(schema, table, { fields, page, sort, search }) {
    let query = this._queryBuilder(schema, table)
    if(fields)
      query = query.select(...fields)
    if(page)
      query = query.offset((page.index - 1) * page.size).limit(page.size)
    if(sort)
      query = query.orderBy(sort
        .filter(item => item.sort != 'no')
        .map(item => ({ column: item.name, order: item.sort }))
      )
    if(search)
      for(let { field, operator, value } of search) {
        if([
          '=', '!=', '>', '>=', '<', '<=', 'like',
          'in', 'not in'
        ].indexOf(operator) > -1)
          query = query.where(field, operator, value)
        else if('null' === operator)
          query = query.whereNull(field)
        else if('not null' === operator)
          query = query.whereNotNull(field)
        else
          noty.fatal('预料之外的操作符：' + operator)
      }
    return query
  }

  async updateMany(db, tb, changedList) {
    this.formatInput(changedList.map(item => item.changed))
    const table = db? db + '.' + tb : tb
    return await this.client.transaction(trx =>
      Promise.all(changedList.map(
        item => trx(table).where(item.pk).update(item.changed)
      ))
    )
  }

  async drop(db, tb, where) {
    if(Object.keys(where).length == 0)
      throw Error('deleting all data?')
    return this._queryBuilder(db, tb).where(where).del()
  }

  async close() {
    console.debug('connection closing...', this.name)
    await this.client.destroy()
    console.debug('connection closed')
  }

  terminal(...cmds) {
    const terminal = vscode.window.createTerminal()
    for(const cmd of cmds)
      terminal.sendText(cmd)
    terminal.show()
  }

  // Data Query Language
  async getDML2(schema, table) {
    const data = await this._queryBuilder(schema, table)
    // 下面的 queryBuilder 传入 null 是为了最终结果里不包含 schema 名称
    return this._queryBuilder(null, table).insert(data).toString() + ';\n'
  }
  async getDML(el) {
    if(el.isTable) {
      console.debug('导出数据', el.schemaName, el.name)
      return this.getDML2(el.schemaName, el.name)
    }
    const schemaName = getSchemaName(el)
    const tbList = await this.tbList(schemaName)
    console.debug('导出数据', el.name, tbList)
    let content = ''
    for(let tb of tbList)
      content += await this.getDML2(schemaName, tb.name)
    return content
  }
  async exportDML(el) {
    untitledFile.sql(await this.getDML(el))
  }

  async getDDL(el) {
    if(el.isTable) {
      console.debug('导出结构', el.schemaName, el.name)
      return this.getDDL2(el.schemaName, el.name)
    }
    const schemaName = getSchemaName(el)
    const tbList = await this.tbList(schemaName)
    console.debug('导出结构', el.name, tbList)
    let content = ''
    for(let tb of tbList)
      content += await this.getDDL2(schemaName, tb.name)
    return content
  }
  async exportDDL(el) {
    untitledFile.sql(await this.getDDL(el))
  }
  // DDL & DML
  async export(el) {
    untitledFile.sql(
      await this.getDDL(el),
      '\n',
      await this.getDML(el)
    )
  }
}

function getSchemaName(el) {
  if(el.isSqlite3Element)
    return null
  else if(el.isSchema)
    return el.name
  
  const msg = '导出数据失败，意料之外的元素类型'
  noty.fatal(msg)
  throw Error(msg)
}

export
class TableInfo {
  constructor(name) {
    this.name = name
  }
}

export
class ColumnInfo {
  constructor(name, type, notNull, defaultTo, pk, ppzType) {
    this.name = name
    this.type = type
    this.notNull = notNull
    this.defaultTo = defaultTo
    this.pk = pk
    this.ppzType = ppzType
  }
}

export
function notyConnErr(err) {
  noty.error('连接失败，请检查连接信息或服务器 ' + err)
}