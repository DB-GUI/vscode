import { join } from 'path'
import { ExtensionContext } from 'vscode'

export
class PPz_context {
  constructor(
    public context: ExtensionContext,
  ) {}
  
  get_path(relative_path: string) {
    return join(this.context.extensionPath, relative_path)
  }
}
