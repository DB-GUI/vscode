import { TreeItem, TreeItemCollapsibleState } from 'vscode'
import { Connection_config } from '@/main/state/oo'
import { Element } from '@/main/connection_view/oo'

export
interface Basic_info {
  name: string
  icon: string
}

export
interface Adapter {
  name: string
  make_treeview(config: Connection_config): Element
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
