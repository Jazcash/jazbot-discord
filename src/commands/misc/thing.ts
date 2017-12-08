import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import * as request from "request-promise-native";

module.exports = class ThingCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'thing',
			group: 'misc',
			memberName: 'thing',
			description: 'Show sc2 ranks',
			examples: ["thing jazcash"],
			throttling: {
				usages: 5,
				duration: 10
			},
			args: [
				{
					key: 'player',
					prompt: 'Provide a battle.net player',
					type: 'string'
				}
			]
		});
	}

	public async run(msg: CommandMessage, { player }:any): Promise<Message | Message[]> {
		let options = {
			uri: 'https://eu.api.battle.net/sc2/profile/1631893/1/Jazcash/ladders',
			qs: {
				locale: 'en_GB',
				apikey: "buexg2zyhycd9ag7nqxqz8theyqpwmj2"
			},
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true // Automatically parses the JSON string in the response
		};

		async function getProfile(){
			try{
				const result = await request(options);
				return result;
			} catch(err){
				console.error(err);
			}
		}

		getProfile().then((v) => {
			console.log(v);
			let currentseason = v.currentSeason[0].ladder[0];
			msg.reply(currentseason);
		}).catch(err => {
			console.log(err);
		});

		msg.reply("fuck");
	}
};
