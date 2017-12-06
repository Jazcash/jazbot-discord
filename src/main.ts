import * as fs from "fs";
import * as path from "path";

const config = require("../config");
const Commando = require("discord.js-commando");

const sounds:{ [s: string]: string[] } = {};
fs.readdir("sounds", (err, dirs) => {
	for (let dir of dirs){
		fs.readdir(`sounds/${dir}`, (err, files) => {
			sounds[dir] = files;
		});
	}
});

const jazbot = new Commando.CommandoClient({
	commandPrefix: "!",
	owner: "147075197378232320"
});

jazbot.registry
	.registerGroups([
		['misc', 'Various commands']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

jazbot.on("ready", () => {
	console.log("Jazbot is ready!");
});

jazbot.login(config.key);

// const jazbot = new Discord.Client();

// function getRandomSoundFile(){
// 	return `sounds/starcraft/${sounds.starcraft[Math.floor(Math.random() * sounds.starcraft.length)]}`;
// }

// jazbot.on("message", message => {
// 	// if (message.content === "!boop") {
// 	// 	var voiceChannel = message.member.voiceChannel;
// 	// 	voiceChannel.join().then(connection => {
// 	// 		const dispatcher = connection.playFile(getRandomSoundFile());
// 	// 		dispatcher.setVolume(0.2);
// 	// 		dispatcher.on("end", end => {
// 	// 			voiceChannel.leave();
// 	// 		});
// 	// 	}).catch(err => {
// 	// 		console.log(err);
// 	// 	});
// 	// }
// 	if (message.content[0] === "!"){
// 		let args = message.content.substr(1).split(" ");
// 	};
// });

// if (process.platform === "win32") {
// 	var rl = require("readline").createInterface({
// 		input: process.stdin,
// 		output: process.stdout
// 	});

// 	rl.on("SIGINT", function () {
// 		process.emit("SIGINT");
// 	});
// }

// process.on("SIGINT", function () {
// 	//graceful shutdown
// 	process.exit();
// });

// jazbot.login(config.key);
