import * as fs from "fs";
import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

module.exports = class Sc2Command extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'sc2',
			group: 'misc',
			memberName: 'sc2',
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

	public async run(msg: CommandMessage, { text }:any){
		let voiceChannel = msg.member.voiceChannel;
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile(getRandomSoundFile());
			dispatcher.setVolume(0.2);
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => {
			console.log(err);
		});

		return msg.reply("FUCK");
	}
};

const sounds:{ [s: string]: string[] } = {};
fs.readdir("sounds", (err, dirs) => {
	for (let dir of dirs){
		fs.readdir(`sounds/${dir}`, (err, files) => {
			sounds[dir] = files;
		});
	}
});

function getRandomSoundFile(){
	return `sounds/starcraft/${sounds.starcraft[Math.floor(Math.random() * sounds.starcraft.length)]}`;
}
