import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import * as request from "request-promise-native";
const config = require("../../../config");
let AsciiTable = require('ascii-table')

let players: {[s: string]: string} = {
	Jazcash: "76561197998402796",
	MightySheep: "76561198053418143",
	ShoX: "76561197986323978",
	AverageJay: "76561197989813138",
	Raffeh: "76561198261677473"
}

module.exports = class RlCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'rl',
			group: 'misc',
			memberName: 'rl',
			description: 'Gives rocket league stats',
			examples: ["rl Jazcash"],
			throttling: {
				usages: 5,
				duration: 10
			},
			// args: [
			// 	{
			// 		key: 'player',
			// 		prompt: 'Provide a battle.net player name',
			// 		type: 'string'
			// 	}
			// ]
		});
	}

	public async run(msg: CommandMessage, { player }: {player: string}): Promise<Message | Message[]> {
		// if (!(player in players)){
		// 	return msg.reply(`Could not find player: ${player}`);
		// }

		let options = {
			uri: `https://api.rocketleaguestats.com/v1/player/batch`,
			// qs: {
			// 	unique_id: players[player],
			// 	platform_id: 1
			// },
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': config.rlskey
			},
			body: [
				{"platformId":"1", "uniqueId":"76561197998402796"},
				{"platformId":"1", "uniqueId":"76561198053418143"},
				{"platformId":"1", "uniqueId":"76561197986323978"},
				{"platformId":"1", "uniqueId":"76561197989813138"},
				{"platformId":"1", "uniqueId":"76561198261677473"}
			],
			json: true,
			method: "POST"
		};

		try{
			const result = await request(options);

			console.log(result);

			let table = new AsciiTable("A title");
			table.setHeading('Player', 'Wins');

			for (let player of result){
				table.addRow(player.displayName, player.stats.wins);
			}

			console.log(table.toString());

			return msg.reply(`\`\`\`${table.toString()}\`\`\``);
		} catch(err){
			console.error(err);
			return msg.reply(err);
		}
	}
};
