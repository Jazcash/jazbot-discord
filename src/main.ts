import * as Discord from "discord.js";

const jazbot = new Discord.Client();

jazbot.on("message", message => {
	message.reply("u wot m8");
});

jazbot.login("MjQ1Mjg1OTQ4MDA1Mjg1ODg5.DQcIuQ.x6TXog9KpJP_288FkToK6zk7qbU");
