import { PPz_context } from '@/main/oo'
import { Adapter, make_tree_item } from '../oo'
import img_MySQL from '../mysql/icon.svg'
import img_db from '@/asset/database.svg'

export default
function make_mysql_adapter(ppz: PPz_context): Adapter {
  return {
    name: 'demo_adapter',
    make_treeview(config) {
      return { // 一级元素
        get_item: () =>
          make_tree_item(
            '一级元素', // 显示在 treeview
            ppz.get_path(img_MySQL),
            '这是一级元素', // tooltip: 鼠标悬停在“一级元素”上时显示
          )
        ,
        get_children() {
          return [ // 二级元素列表
            { // 二级元素
              get_item: () =>
                make_tree_item(
                  '二级元素',
                  ppz.get_path(img_db),
                  '这是二级元素',
                )
              ,
              get_children() { // 如果还有三级元素...
                return [
                ]
              }
            }
          ]
        }
      }
    }
  }
}
