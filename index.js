import Discord from "discord.js";
import {GatewayIntentBits} from "discord.js";
import createPrivateRoom from "./events/createPrivateRoom.js";

const client = new Discord.Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]});


const prefix = "!";

client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
    createPrivateRoom(oldVoiceState, newVoiceState);
});

client.on( "messageCreate", function(message) {
    console.log("message create", message);
    console.log("content", message.content);
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if(command === "avatar"){
        showAvatar(message);
    }



    client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
        createPrivateRoom(oldVoiceState, newVoiceState);
    });

    if(command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! this message had a latency of ${timeTaken}ms`);
    }
    if(command === "ok" || command === "ок"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`ХУЁК`);
    }
    if(command === "greetme"){

        message.reply("guten Abend, Artem");
    }
});

client.login(process.env.BOT_TOKEN);
