import { EventEmitter, window } from 'vscode'
import key from '@/common/constant/key'
import { State_list, Config_connection } from '@/main/state/oo'
import { Element, Has_item, Has_children, Element_root } from './oo'

// https://code.visualstudio.com/api/extension-guides/tree-view

export
function init_connection_view(state: State_list<Config_connection>) {
  const event_emitter = new EventEmitter<Element>()
  window.createTreeView<Element>(key.view.id.connection, {
    // https://code.visualstudio.com/api/references/vscode-api#TreeViewOptions
    showCollapseAll: true,
    treeDataProvider: {
      // https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
      onDidChangeTreeData: event_emitter.event,
      getChildren: (el: Has_children = new Element_root(state)) =>
        el.get_children()
      ,
      getTreeItem: (el: Has_item) =>
        el.get_item()
    }
  })
  return event_emitter
}
