import Discord from "discord.js";
import {GatewayIntentBits} from "discord.js";
import createPrivateRoom from "./events/createPrivateRoom.js";

//import db
import mongoose from "mongoose";

// import event Services
import UserEventsService from "./events/UserEvents.service.js";
import ChanelMessagesService from "./events/ChanelMessages.service.js";
import LilithService from "./events/Lilith.service.js";
import ManageChanelsService from "./events/ManageChanels.service.js";
import EmbedService from "./events/Embed.service.js";
import ManageServerService from "./events/ManageServer.service.js";
import WordsGameService from "./events/wordsGame.service.js";
import wordsGameService from "./events/wordsGame.service.js";

// import models
import WordsGameModel from "./models/wordsGameModel.js";

export const client = new Discord.Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]});

await client.login(process.env.BOT_TOKEN);

client.on("ready", async () => {
    console.log("bot ready!");
    try{
        client.user.setActivity("I am Lilith");
        await mongoose.connect(process.env.MONGO_URI, () => {
            console.log("db connected");
        });
    } catch(e){
        console.error("error", e);
    }
    console.log("I am ready for you, darling");
});


const prefix = "$";

client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
    createPrivateRoom(oldVoiceState, newVoiceState);
});

client.on( "messageCreate", async (message) => {
    if (message.author.bot) return;


    //***
    // words game
    const WordsGames = await WordsGameModel.find();
    const WordsGameChannels = WordsGames.map((WordsGame) => {
        return WordsGame.channelId;
    })
    console.log("ids", WordsGameChannels, message.channel.id);
    if(WordsGameChannels.indexOf(message.channel.id) !== -1){
            const wordGame = await wordsGameService.getWordGame(message);

            if(message.content === "$wordsgamestop"){
                await WordsGameService.stopGame(message);
            }

            if(message.mentions){
                const mentions = message.mentions.users;
                console.log("mentions", mentions);
                mentions.forEach((mention) => {
                    console.log("mentioned user id", mention.id);
                }); // тут потом добавлять пользователей в базу данных
                return;
            }

            if(!wordGame.gameActive) {
                console.log("game move... analyze game move...");
                if(message.content.startsWith(prefix)){
                        await message.reply("wrong word. word must begin with regular letter of the alphabet");
                        return;
                }
                await wordsGameService.activate(message);
                await message.reply(`first word - ${message.content}. next word must begin with ${message.content[message.content.length - 1]}`);
                await WordsGameService.saveWord(message);
            } else {
                await WordsGameService.checkWord(message)
            }
    }
    // words game
    // ***


    //await LilithService.react(message); - тут иногда происходит ошибка.
    //console.log("message create", message);
    //console.log("content", message.content);
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    switch (command){
        case "ok" || "ок":
            message.reply(`ХУЁК`);
            break;
        case "members":
            await UserEventsService.showMembers(client, message)
            break;
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
        case "kiss":
            if (!args.length) return;
            await EmbedService.createEmbed(message, "kiss", args);
            break;
        case "hit":
            if (!args.length) return;
            await EmbedService.createEmbed(message, "spank", args);
            break;
        case "hug":
            if (!args.length) return;
            await EmbedService.createEmbed(message, "embrace", args);
            break;
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

    }

    if(command === "greetme"){
        message.reply("guten Abend, Artem");
    };
});





// если один юзер постоянно заходит и выходит, ивент не работает каждый раз, выходит.
client.on("guildMemberAdd", async (member) => {
    console.log("new user joined", member);
    await UserEventsService.onJoin(member)
});