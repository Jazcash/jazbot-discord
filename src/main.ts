const config = require("../config");

import * as Discord from "discord.js";

const jazbot = new Discord.Client();

jazbot.on("message", message => {
	if (message.content === "!boop") {
		var voiceChannel = message.member.voiceChannel;
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile("../sounds/Alert_ZergNeedMoreFood.mp3");
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
