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
interface Upsert_form_field {
  key: string
  label: string
  type: 'string' | 'number' | 'file'
}

export
interface Adapter<Connection_config> {
  make_treeview(config: Connection_info<Connection_config>): Element
  webview: {
    connection: {
      upsert: Upsert_form_field[]
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
