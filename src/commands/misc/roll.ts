import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

module.exports = class RollCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'roll',
			group: 'misc',
			memberName: 'roll',
			description: 'Pick a random choice from a given list',
			examples: ["roll indian chinese chippy pizza"],
			throttling: {
				usages: 5,
				duration: 10
			},
			args: [
				{
					key: 'text',
					prompt: 'Provide some options',
					type: 'string'
				}
			]
		});
	}

	public async run(msg: CommandMessage, { text }:any): Promise<Message | Message[]> {
		console.log(text);
		return msg.say(text);
	}
};
