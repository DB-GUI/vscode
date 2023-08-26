import mysql from 'mysql2/promise'
import { PPz_context } from '@/main/oo'
import { Element } from '@/main/connection_view/oo'
import { make_tree_item } from '../oo'
import { Mysql_connection_config } from './oo'

import img_icon from './icon.svg'
import img_db from '@/asset/database.svg'
import img_table from '@/asset/table.svg'

const get_conn_option = ({ // 驱动（mysql2）建立连接时，不能传入多余属性
  host, port, user, password, database,
}: Mysql_connection_config) => ({
  host, port, user, password, database,
})

export default
function mm_treeview(ppz: PPz_context) {
  return function make_treeview(config: Mysql_connection_config): Element {
    return {
      get_item: () =>
        make_tree_item(
          config.name,
          ppz.get_path(img_icon),
          'a MySQL connection',
        )
      ,
      async get_children() {
        // 建立连接
        const conn = await mysql.createConnection(get_conn_option(config))
        const use = (db: string) => conn.query('use ' + db)
        // 查询有哪些数据库（MySQL 一级节点）
        const [ db_list ] = (
          await conn.query('show databases;')
        ) as any[][]
        return db_list.map(
          function make_db_el(db) {
            // MySQL database element
            const db_name = db.Database
            return {
              get_item: () => make_tree_item(
                db_name,
                ppz.get_path(img_db),
                'a MySQL database',
              ),
              async get_children() {
                await use(db_name)
                const [ tb_list ] = (
                  await conn.query('show tables;')
                ) as any[][]
                return tb_list.map(
                  function make_table_el(tb) {
                    // MySQL table element
                    return {
                      get_item() {
                        const tb_item = make_tree_item(
                          Object.values(tb)[0] as string,
                          ppz.get_path(img_table),
                          'a MySQL table',
                          false, // no children
                        )
                        return tb_item
                      },
                      // get_children() { // MySQL table has no children
                    }
                  }
                )
              }
            }
          }
        )
      }
    }
  }
}
