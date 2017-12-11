import * as fs from "fs";
import { Guild, Message } from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

module.exports = class ThingCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: 'thing',
			group: 'misc',
			memberName: 'thing',
			description: 'Says a thing',
			examples: ["Plays a Starcraft 2 sound effect in voice chat"],
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	public async run(msg: CommandMessage){
		let voiceChannel = msg.member.voiceChannel;
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile(getRandomSoundFile());
			dispatcher.setVolume(0.5);
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
