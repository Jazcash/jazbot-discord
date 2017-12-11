import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import * as request from "request-promise-native";

let players: {[s: string]: string} = {
	Jazcash: "1631893",
	MightySheep: "1706238",
	ShoX: "344118",
	Phobic: "1679933"
}

module.exports = class SC2Command extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'sc2',
			group: 'misc',
			memberName: 'sc2',
			description: 'Show sc2 ranks',
			examples: ["sc2 jazcash"],
			throttling: {
				usages: 5,
				duration: 10
			},
			args: [
				{
					key: 'player',
					prompt: 'Provide a battle.net player name',
					type: 'string'
				}
			]
		});
	}

	public async run(msg: CommandMessage, { player }:{ player: string }): Promise<Message | Message[]> {
		if (!(player in players)){
			return msg.reply(`Could not find player: ${player}`);
		}

		let options = {
			uri: `https://eu.api.battle.net/sc2/profile/${players[player]}/1/${player}/ladders`,
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
			return msg.reply(currentseason);
		}).catch(err => {
			console.log(err);
		});

		return null;
	}
};
