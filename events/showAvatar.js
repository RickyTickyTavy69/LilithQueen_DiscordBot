import Discord from "discord.js";
import {GatewayIntentBits} from "discord.js";
import config from "config";

const client = new Discord.Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]});

client.login(config.get("BOT_TOKEN"));

export default async function(message){

}

