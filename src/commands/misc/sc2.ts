import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import * as request from "request-promise-native";
const config = require("../../../config");

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

	async run(msg: CommandMessage, { player }:{ player: string }): Promise<Message | Message[]> {
		if (!(player in players)){
			return msg.reply(`Could not find player: ${player}`);
		}

		let options = {
			uri: `https://eu.api.battle.net/sc2/profile/${players[player]}/1/${player}/ladders`,
			qs: {
				locale: 'en_GB',
				apikey: config.blizzardkey
			},
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true
		};

		try{
			const result = await request(options);
			let soloSeasonLadder: SeasonLadder | undefined;

			for (let list of result.currentSeason){
				for (let ladder of list.ladder){
					if (ladder.matchMakingQueue === "LOTV_SOLO"){
						soloSeasonLadder = ladder;
					}
				}
			}

			if (typeof soloSeasonLadder === "undefined") return msg.reply("Error!");

			return msg.embed({
				title: `SC2 Season Stats for ${player}`,
				fields: [
					{
						name: "League",
						value: soloSeasonLadder.league,
						inline: false
					},
					// {
					// 	name: "Division",
					// 	value: soloSeasonLadder.division,
					// 	inline: true
					// },
					{
						name: "Rank",
						value: soloSeasonLadder.rank,
						inline: true
					},
					{
						name: "Wins",
						value: soloSeasonLadder.wins,
						inline: true
					},
					{
						name: "Losses",
						value: soloSeasonLadder.losses,
						inline: true
					}
				]
			});
		} catch(err){
			console.error(err);
			return msg.reply(err);
		}
	}
};

interface SeasonLadder{
	division: number;
	ladderId: number;
	ladderName: string;
	league: string;
	losses: number;
	matchMakingQueue: string;
	rank: number;
	showcase: boolean;
	wins: number;
}
