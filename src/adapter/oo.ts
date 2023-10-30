import { TreeItem, TreeItemCollapsibleState } from 'vscode'
import { Element } from '@/main/connection_view/oo'
import { Connection_info } from '@/main/state/oo'


export
interface Adapter<Connection_config> {
  key: string
  label: string
  make_treeview(config: Connection_info<Connection_config>): Element
  webview: {
    connection: {
      upsert: {
        form: Upsert_form_field[]
      }
    }
  }
}

export
function make_tree_item(
  label: string,
  icon?: string,
  tooltip?: string,
  has_children: boolean = true,
) {
  const item = new TreeItem(label, has_children
    ? TreeItemCollapsibleState.Collapsed
    : TreeItemCollapsibleState.None
  )
  if(tooltip)
    item.tooltip = tooltip
  if(icon)
    item.iconPath = icon
  return item
}
