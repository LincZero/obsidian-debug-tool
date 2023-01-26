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
      const ul = container.createEl("ul", { text: command_item.name })
      for (let command_item2 of command_item.children){
        const li = container.createEl("li", { text: command_item2.name })
        li.onclick = command_item2.callback
      }
    }
  }
}
