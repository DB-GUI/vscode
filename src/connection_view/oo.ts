import { TreeItem, TreeItemCollapsibleState } from 'vscode'
import { State_list, Config_connection } from 'src/state/oo'

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

const collapse_default = TreeItemCollapsibleState.Collapsed

export
class Element_root implements Has_children {
  private collapse_default: TreeItemCollapsibleState = collapse_default
  constructor(private state: State_list<Config_connection>) {
  }

  get_children() {
    return this.state.get().map(config => new Element_conn(config))
  }
}

class Element_conn implements Has_both {
  constructor(
    private config: Config_connection,
  ) {}
  get_children() {
    return []
  }
  get_item() {
    return new TreeItem(this.config.name)
  }
}
