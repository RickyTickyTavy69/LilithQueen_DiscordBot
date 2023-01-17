import Discord, {Partials, Events, Collection} from "discord.js";
import {GatewayIntentBits} from "discord.js";
import createPrivateRoom from "./events/createPrivateRoom.js";

//dotenv
import dotenv from "dotenv";
dotenv.config();


//import db
import mongoose from "mongoose";

// import event Services - rewrite to commands!
/*import UserEventsService from "./events/UserEvents.service.js";
import ChanelMessagesService from "./events/ChanelMessages.service.js";
import ManageChanelsService from "./events/ManageChanels.service.js";
import EmbedService from "./events/Embed.service.js";
import ManageServerService from "./events/ManageServer.service.js";
import WordsGameService from "./events/wordsGame.service.js";
import GetInfoService from "./events/getInfo.service.js";*/
// rewrite to commands
import LilithService from "./events/Lilith.service.js";

// import models
import WordsGameModel from "./models/wordsGameModel.js";
import GallowsGameService from "./events/gallowsGameService.js";

//discord rest
import {REST} from "discord.js";
import {Routes} from "discord.js";
const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN);


export const client = new Discord.Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
        ], partials: [
            Partials.Message, Partials.User, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.ThreadMember
        ]
    }
);

client.commands = new Collection();
client.functions = new Collection()
//import commands
import commandArray from "./commands/commands.js"
import functions from "./commands/functions.js"

for(const command of commandArray){
    client.commands.set(command.data.name, command);
}

for(const func of functions){
    client.functions.set(func.data.name, func);
}


/// trying slash commands ///

const start = async () => {
    try{
        await client.login(process.env.BOT_TOKEN)
        await mongoose.connect(process.env.MONGO_URI, () => {
            console.log("db connected")
        });

        //await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.INSOMNIA_GUILD_ID), {body: commands})
    } catch(e){
        console.log("error while starting", e);
    }

}
start();



client.on("ready", async () => {
    try{
        client.user.setActivity("У меня есть апельсиновая пушка, и я иногда из неё стреляю");
    } catch(e){
        console.error("error", e);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {

        if (interaction.isButton()) {
            //console.log("button pressed")
            //console.log(`customId is ${interaction.customId}`);
            const actionId = interaction.customId.split(" ")[0];
            console.log("actionId", actionId);
            const targetId = interaction.customId.split(" ")[1];
            //console.log(`targetId is ${targetId}`);
            const targetUser = await client.users.fetch(targetId);
            const func = interaction.client.functions.get(actionId);
            try{
                await func.execute(interaction, targetUser);
            } catch(e){
                console.log("error", e);
                await interaction.reply({content: "простите, произошла ашипка", ephemeral: true })
            }
            return;
        }

        if(!interaction.isChatInputCommand()) return
        console.log("create", interaction.client.commands);
        console.log("command name", interaction.commandName);
        const command = interaction.client.commands.get(interaction.commandName);

        try{
            await command.execute(interaction);
        } catch(e){
            console.log("error", e);
            await interaction.reply({content: "простите, произошла ашипка", ephemeral: true })
        }
})

/// trying slash commands ///


client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
    createPrivateRoom(oldVoiceState, newVoiceState);
});

client.on( "messageCreate", async (message) => {
    console.log("message created...", message.content);
    if (message.author.bot) return;
    await LilithService.react(message);
});

/*
client.on( "messageCreate", async (message) => {

    console.log("message created...", message.content);

    if (message.author.bot) return;

    await LilithService.react(message);

    const WordsGames = await WordsGameModel.find();
    const WordsGameChannels = WordsGames.map((WordsGame) => {
        return WordsGame.channelId;
    })
    console.log("ids", WordsGameChannels, message.channel.id);
    if(WordsGameChannels.indexOf(message.channel.id) !== -1){

            const wordGame = await WordsGameService.getWordGame(message);

            if(message.content === "$wordsgamestop"){
                await WordsGameService.stopGame(message);
            }

            console.log("size", message.mentions.users.size);
            if(message.mentions.users.size){
                //const keys = Object.keys(message.mentions.users).length;
                //console.log("keys", keys);
                const mentions = message.mentions.users;
                console.log("mentions", mentions);
                let usersArray = [];
                let usernames = [];
                mentions.forEach((mention) => {
                    console.log("mentioned user id", mention.id);
                    usersArray.push({
                        userId: mention.id,
                        username: mention.username,
                        points: 0,
                        active: true,
                    });
                    usernames.push(mention.username);
                });
                await WordsGameService.addUsers(message, usersArray);
                await message.reply(`you added players: ${usernames.join(", ")}`);
                return;
            }


            if(!wordGame.gameActive) {
                console.log("game move... analyze game move...");
                const users = await WordsGameService.checkUsers(message);
                if(!users){
                    console.log("users not found");
                    await message.reply("you have not added any player yet. Add players before you start the game...");
                    return;
                }else {
                    console.log("users found");
                    await WordsGameService.checkWord(message);
                    await message.reply(`first word - ${message.content}. next word must begin with ${message.content[message.content.length - 1]}`);
                }
            } else {
                await WordsGameService.checkWord(message);
            }

            if(message.mentions){
                const mentions = message.mentions.users;
                console.log("mentions", mentions);
                mentions.forEach((mention) => {
                    console.log("mentioned user id", mention.id);
                }); // тут потом добавлять пользователей в базу данных
                return;
            }

    }
    // words game
    // ***

    //console.log("message create", message);
    //console.log("content", message.content);
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    switch (command){
        //chanel message handlers
        case "clearnew":
            await ChanelMessagesService.clearAll(client, message)
            break;
        //bot handlers
        case "updatestatus":
            if (!args.length) return;
            await LilithService.updateStatus(args, message, client)
            break;
        //managing chanels
        case "privatecn":
            await ManageChanelsService.createPrivate(message)
            break;
        //actions
        case "avatar":
            if (!args.length) return;
            await EmbedService.createEmbed(message, "avatar", args);
            break;
            //administration
        case "block":
            if (!args.length) return;
            await UserEventsService.banuser(message, args);
            break;
        case "unblock":
            if (!args.length) return;
            await UserEventsService.unbanUser(message, args);
            break;
        case "throw":
            if (!args.length) return;
            await UserEventsService.kickUser(message, args);
            break;
            //manage Server
        case "setwelcome":
            if (!args.length) return;
            await ManageServerService.setWelcome(message, args);
            break;
        case "simjoin":
            client.emit("guildMemberAdd", message.member);
            break;
            //some games
        case "wordsgame":
            await WordsGameService.setWordsChanel(message);
            break;
        case "help":
            console.log("help embed");
            await EmbedService.createEmbed(message, "help");
            break;
        case "info":
            console.log("getting info...");
            if(!args) return;
            await GetInfoService.getFilmInfo(message, args);
            break;
        case "deleteone":
            await message.channel.send("hello");
            break;
            //gallows game
        case "gallowsgame":
            await GallowsGameService.startGame(message);
            break;
        case "setglead":
            if(!args) return;
            await GallowsGameService.setLeadingPlayer(message, args);
            break;
        case "setgword":
            if(!args) return;
            await GallowsGameService.setgword(message, args);
    }
});





// если один юзер постоянно заходит и выходит, ивент не работает каждый раз, выходит.
client.on("guildMemberAdd", async (member) => {
    console.log("new user joined", member);
    await UserEventsService.onJoin(member)
});*///