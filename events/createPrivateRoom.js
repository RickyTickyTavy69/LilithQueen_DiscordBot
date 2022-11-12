import {Collection, GatewayIntentBits, ChannelType} from "discord.js";
const voiceCollection = new Collection();
import Discord from "discord.js";


import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]});

client.login(process.env.BOT_TOKEN);


export default async function(oldState, newState){
    const user = await client.users.fetch(newState.id); // id of the user who entered the voice channel.
    const member = await newState.guild.members.cache.get(user.id);
    if(!oldState.channel && newState.channel.id === '1038482541574901882'){
        console.log("creating new private channel");
        const channel = await newState.guild.channels.create({
            name: user.tag,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent,
        });
        await member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);
    } else if(!newState.channel) {
        console.log("delete channel...")
        if(oldState.channelId === voiceCollection.get(newState.id)) return oldState.channel.delete();
    }
}