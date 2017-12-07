import * as path from "path";

const config = require("../config");
const Commando = require("discord.js-commando");

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
