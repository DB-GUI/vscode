import { TreeItem } from 'vscode'

export
interface Has_children {
  get_children(): Element[]
}

export
interface Has_item {
  get_item(): TreeItem
}

export
interface Has_both extends Has_children, Has_item {}

export
type Element = Has_children | Has_item | Has_both
