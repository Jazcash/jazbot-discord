import * as path from "path";
import { ArgumentType } from "discord.js-commando";

const config = require("../config");
//const store = require("../store");
const Commando = require("discord.js-commando");

const jazbot = new Commando.CommandoClient({
	commandPrefix: "!",
	owner: "147075197378232320"
});

//jazbot.store = store;

jazbot.registry
	.registerGroups([
		['misc', 'Various commands']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

jazbot.on("ready", () => {
	console.log("Jazbot is ready!");
});

jazbot.login(config.discordkey);
