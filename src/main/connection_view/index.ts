import { EventEmitter, window } from 'vscode'
import { PPz_context } from '../oo'
import key from '@/common/constant/key'
import { State_list, Connection_info } from '@/main/state/oo'
import { Element, Has_item, Has_children } from './oo'
import get_adapter from '@/adapter'

// https://code.visualstudio.com/api/extension-guides/tree-view

export
function init_connection_view(ppz: PPz_context, state: State_list<Connection_info<any>>) {
  const event_emitter = new EventEmitter<Element>()
  window.createTreeView<Element>(key.view.id.connection, {
    // https://code.visualstudio.com/api/references/vscode-api#TreeViewOptions
    showCollapseAll: true,
    treeDataProvider: {
      // https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
      onDidChangeTreeData: event_emitter.event,
      getChildren: (el: Has_children = make_root(ppz, state)) =>
        el.get_children()
      ,
      getTreeItem: (el: Has_item) =>
        el.get_item()
    }
  })
  return event_emitter
}

function make_root(ppz: PPz_context, state: State_list<Connection_info<any>>) {
  return {
    get_children() {
      return state.get() // 获取所有连接
        .map(config =>
          get_adapter(ppz, config.adapter) // 根据 config 获取适配器
            .make_treeview(config)
      )
    }
  }
}
