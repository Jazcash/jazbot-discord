import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

module.exports = class SayCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'say',
			group: 'misc',
			memberName: 'say',
			description: 'Says a thing',
			examples: ["say Hi there!"],
			throttling: {
				usages: 5,
				duration: 10
			},
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the bot to say?',
					type: 'string'
				}
			]
		});
	}

	public async run(msg: CommandMessage, { text }:any): Promise<Message | Message[]> {
		msg.delete();
		return msg.say(text);
	}
};
