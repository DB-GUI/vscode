const vscode = require('vscode')

module.exports = {
  treeDataProvider: {
    getChildren() {
      return [
        {
          label: '关于',
          icon: new vscode.ThemeIcon('info'),
          tooltip: '点击展开详情',
        },
        {
          label: '意见反馈',
          icon: new vscode.ThemeIcon('comment'),
          tooltip: '任何形式的意见、建议、批评都是欢迎的',
        },
        {
          label: '发现 bug！',
          icon: new vscode.ThemeIcon('bug'),
          tooltip: '如果您发现 bug，我首先表示抱歉，其次请求您告诉我',
        },
        {
          label: '清空 ppz',
          icon: new vscode.ThemeIcon('trash'),
          tooltip: '此操作将删除所有连接数据，但不会对数据库有任何操作',
        }
      ]
    },
    getTreeItem({ label, icon, tooltip }) {
      const result = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None)
      result.iconPath = icon
      if(tooltip)
        result.tooltip = tooltip
      return result
    }
  }
}