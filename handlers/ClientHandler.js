import {client} from "../index.js";
import LilithService from "../events/Lilith.service.js";
import WordsGameModel from "../models/wordsGameModel.js";
import wordsgameMethods from "../api/wordsgameMethods.js";

// games
import {WordsGame} from "../games/WordsGame.js";

export class ClientHandler{

    // handling Interactions
    static async HandleInteraction(interaction){
        if (interaction.isButton()) {
            const actionId = interaction.customId.split(" ")[0];
            const targetId = interaction.customId.split(" ")[1];
            let targetUser = null;
            if(targetId){
                targetUser = await client.users.fetch(targetId);
            }
            const func = interaction.client.functions.get(actionId);
            try{
                await func.execute(interaction, targetUser);
            } catch(e){
                console.log("error", e);
                await interaction.reply({content: `oh, shit, I'm sorry, an error happened, ${e}`, ephemeral: true });
            }
            return;
        }

        //if(!interaction.isChatInputCommand()) return
        //console.log("create", interaction.client.commands);
        //console.log("command name", interaction.commandName);
        const command = interaction.client.commands.get(interaction.commandName);
        try{
            await command.execute(interaction);
        } catch(e){
            console.log("error", e);
            await interaction.reply({content: `sorry, an error happened ${e}`, ephemeral: true });
        }
    }

    static async HandleMessages(message){
        if (message.author.bot) return;
        await LilithService.react(message);
        console.log("message created...", message.content);
        // here the bot should control if the message is in the words channel
        // this is the words game code below
        const guildId = message.guild.id;
        const wordsChannel = await WordsGameModel.findOne({ serverId: guildId});
        if(!wordsChannel) return;
        if(wordsChannel.channelId === message.channel.id){
            console.log("word printed", message.content);
            await WordsGame.HandleNewWord(message);
        }
    }
}