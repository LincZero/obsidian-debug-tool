import {ItemView} from "obsidian"
import {command_list} from "./commands"

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
    for (let command_item of command_list){
      const p = container.createEl("li", { text: command_item.name })
      p.onclick = command_item.callback
    }
  }
}
