import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

module.exports = class SayCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'say',
			group: 'util',
			memberName: 'say',
			description: 'Says a thing',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	public async run(msg: CommandMessage): Promise<Message | Message[]> {
		return msg.reply("hi");
	}
};
