import Discord, {Partials, Events, Collection} from "discord.js";
import createPrivateRoom from "./events/createPrivateRoom.js";
import commandArray from "./commands/commands.js"
import functions from "./commands/functions.js"
import ServerInfoModel from "./models/serverInfoModel.js";
import express from "express";

// Client handler
import {ClientHandler} from "./handlers/ClientHandler.js";

//dotenv
import dotenv from "dotenv";
dotenv.config();

//import db
import mongoose from "mongoose";

import LilithService from "./events/Lilith.service.js";
import wordsgameMethods from "./api/wordsgameMethods.js";

// import models
import WordsGameModel from "./models/wordsGameModel.js";
import GallowsGameService from "./events/gallowsGameService.js";

//discord rest
import {REST} from "discord.js";
import {Routes} from "discord.js";
import CheckersAuthController from "./express/CheckersAuth.controller.js";
// const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN);

// create bot client
export const client = new Discord.Client({
    intents: [3276799] , partials: [
            Partials.Message, Partials.User, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.ThreadMember
        ]
    }
);

//create express server
const app = express()



client.commands = new Collection();
client.functions = new Collection()
//import commands



for(const command of commandArray){
    client.commands.set(command.data.name, command);
}

for(const func of functions){
    client.functions.set(func.data.name, func);
}


/// trying slash commands ///

const start = async () => {
    try{
        //console.log(`process env ${JSON.stringify(process.env)}`);
            console.log(`token is ${process.env.BOT_TOKEN}`);
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log(`express server is running on PORT ${PORT}`)
        })
        await client.login(process.env.BOT_TOKEN);
            console.log("bot is here");
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'Insomnia'
        }, () => {console.log("db connected")} );

        //await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.INSOMNIA_GUILD_ID), {body: commands})
    } catch(e){
        console.log("error while starting", e);
    }

}
start();


//configure express server routes





client.on("ready", async () => {
    try{
        client.user.setActivity("сервер поддержки: https://discord.gg/CpdkYg7GQ6");
         // await CheckersAuthController.Auth()
    } catch(e){
        console.error("error", e)
    }
});

client.on(Events.GuildMemberAdd, async (member) => {
    // when someone enters the server.
    console.log(`кто то зашёл`);
    const guildID = member.guild.id;
    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
    if(serverInfo){
        const welcomeChannelID = serverInfo.welcomeChannelId;
        const unverifiedRoleID = serverInfo.unverifiedroleID;
        const unverifiedRole = member.guild.roles.cache.get(unverifiedRoleID);
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        welcomeChannel.send(`hello, ${member.user.username} how are you doing?`);
        member.roles.add(unverifiedRole);
    }
});

client.on(Events.GuildMemberRemove, (member) => {
    // when someone leaves the server.
    console.log(`кто то ушёл`);
    const channel = member.guild.channels.cache.get("1068652514372751370");
    if(channel){
        channel.send(`жаль, что Вы уходите, ${member.user.username}. Если Вам что то не понравилось на нашем сервере, вы можете написать администрации.`);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    // if Interaction is created, it is handled here.
    await ClientHandler.HandleInteraction(interaction);
})

client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
    // creating private room, when moving into a special room [+].
    createPrivateRoom(oldVoiceState, newVoiceState);
});

client.on( "messageCreate", async (message) => {
    // when message is created it will be handled here.
    await ClientHandler.HandleMessages(message);
});

client.on( "messageReactionAdd", async (reaction, user) => {
    const channelId = reaction.message.channelId
    if (channelId === "1071874130376409108"){
        console.log("emoji id", reaction.emoji.id);
        const id = reaction.emoji.id;
        console.log("userid", user.id);
        switch(id){
            case "1086000873353773057":
                const member = await reaction.message.guild.members.fetch(user.id);
                console.log("night butterfly");
                const role = member.guild.roles.cache.find(role => role.name === "🦋_Ночная Бабочка_🦋");
                console.log("role found", role);
                await member.roles.add(role);
                return;
        }
    }

});


client.on( Events.MessageReactionRemove, async (reaction, user) => {
    const channelId = reaction.message.channelId
    if (channelId === "1071874130376409108") {

        const id = reaction.emoji.id;
        switch (id) {
            case "1086000873353773057":
                const member = await reaction.message.guild.members.fetch(user.id);
                console.log("night butterfly");
                const role = member.guild.roles.cache.find(role => role.name === "🦋_Ночная Бабочка_🦋");
                console.log("role found", role);
                await member.roles.remove(role);
                return;
        }
    }
});


