import {ItemView, WorkspaceLeaf} from "obsidian"

export const VIEW_TYPE_DEBUGTOOL = 'debug-tool';

export class CommandView extends ItemView {
  // override - abstract
  getViewType() {
    return VIEW_TYPE_DEBUGTOOL;
  }

  // override - abstract
  getDisplayText() {
    return "Debug Tool";
  }

  // override
  getIcon() {
    return "bug"
  }

  // override
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Debug Tool" });
  }
}