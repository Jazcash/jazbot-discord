const config = require("../config");

import * as fs from "fs";
import * as Discord from "discord.js";

let sounds:{ [s: string]: string[] } = {};
fs.readdir("sounds", (err, dirs) => {
	for (let dir of dirs){
		fs.readdir(`sounds/${dir}`, (err, files) => {
			sounds[dir] = files;
		});
	}
});

const jazbot = new Discord.Client();

function getRandomSoundFile(){
	return `sounds/starcraft/${sounds.starcraft[Math.floor(Math.random() * sounds.starcraft.length)]}`;
}

jazbot.on("message", message => {
	if (message.content === "!boop") {
		var voiceChannel = message.member.voiceChannel;
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile(getRandomSoundFile());
			dispatcher.setVolume(0.2);
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => {
			console.log(err);
		});
	}
});

if (process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("SIGINT", function () {
		process.emit("SIGINT");
	});
}

process.on("SIGINT", function () {
	//graceful shutdown
	process.exit();
});

jazbot.login(config.key);
