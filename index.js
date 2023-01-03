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

export const client = new Discord.Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]});


const prefix = "$";

client.on("voiceStateUpdate",(oldVoiceState,newVoiceState)=>{
    createPrivateRoom(oldVoiceState, newVoiceState);
});

client.on( "messageCreate", async (message) => {
    await LilithService.react(message);
    //console.log("message create", message);
    console.log("content", message.content);
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
        case "spank":
            if (!args.length) return;
            await EmbedService.createEmbed(message, "spank", args);
            break;
        case "embrace":
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
            if (!args.length) return;
            await ManageServerService.setWelcome(message, args);
            break;
    }

    if(command === "greetme"){
        message.reply("guten Abend, Artem");
    };
});

client.on("ready", async () => {
    console.log("bot ready!");
    client.emit("guildMemberAdd");
    try{
        client.user.setActivity("♂️ stick♂️  in ♂️ my ass ♂");
        //client.user.setActivity("Hello, I am Lilith ;)");
        await mongoose.connect(process.env.MONGO_URI, () => {
            console.log("db connected");
        });
    } catch(e){
        console.error("error", e);
    }
    console.log("I am ready for you, darling");
})

await client.login(process.env.BOT_TOKEN);

// если один юзер постоянно заходит и выходит, ивент не работает каждый раз, выходит.
client.on("guildMemberAdd", ( )=> {
    console.log("new user joined");
    //await UserEventsService.onJoin(member)
});