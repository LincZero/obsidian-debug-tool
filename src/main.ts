import {Plugin} from 'obsidian';
import {addCommands} from './commands';

export default class DebugPlugin extends Plugin {
	addCommands_2 = addCommands.bind(this)

	async onload() {
		this.addCommands_2()
	}

	onunload() {}
}
