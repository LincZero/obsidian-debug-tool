import {Plugin, View, WorkspaceLeaf} from 'obsidian';
import {addCommands} from './commands';
import {CommandView, VIEW_TYPE_DEBUGTOOL} from './commandView';

export default class DebugPlugin extends Plugin {
	view: View;
	addCommands_2 = addCommands.bind(this)

	async onload() {
		this.addCommands_2()
		this.registerView(
			VIEW_TYPE_DEBUGTOOL, 
			(leaf: WorkspaceLeaf) => this.view = new CommandView(leaf)
		);

		this.addRibbonIcon("bug", "Debug Tool View", () => {
      this.activateView();
		});
	}

	async onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_DEBUGTOOL);
  }

	// 激活调试工具的视图
	async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_DEBUGTOOL);	// 先移除

    await this.app.workspace.getRightLeaf(false).setViewState({	// 再添加
      type: VIEW_TYPE_DEBUGTOOL,
      active: true,
    });

    this.app.workspace.revealLeaf(															// 再显示
      this.app.workspace.getLeavesOfType(VIEW_TYPE_DEBUGTOOL)[0]
    );
	}
}
