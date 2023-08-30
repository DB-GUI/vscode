import { TreeItem, TreeItemCollapsibleState } from 'vscode'
import { Element } from '@/main/connection_view/oo'
import { Connection_info } from '@/main/state/oo'

type Field_type = string | number | 'file'
type Connection_config = Record<string, Field_type | undefined>
export
interface Simple_connection_config extends Connection_config {
  host: string
  port: number
  user: string
  password: string
}

export
interface Basic_info {
  name: string
  icon: string
}

export
interface Adapter<Connection_config> {
  name: string
  make_treeview(config: Connection_info<Connection_config>): Element
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
