
//packages
import axios from "axios";

// models
import WordsGameModel from "../models/wordsGameModel.js";

//services
import EmbedService from "./Embed.service.js";

class WordsGameService{

    static dictKey = process.env.YA_DISTIONARY_KEY;

    static async getWordGame(message){
        const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
        return wordsGame;
    }

    static async setWordsChanel(message) {
        try{
            const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
            if(wordsGame){
                message.reply(`already set game channel. ChannelId is ${wordsGame.channelId}`);
            } else{
                const wordsGame = new WordsGameModel({
                    serverId: message.guild.id,
                    channelId: message.channel.id,
                });
                await wordsGame.save();
                await EmbedService.createEmbed(null, "words", {chanel: message.channel});
            }
        }catch(e){
            console.log("error", e);
            message.reply("some error happened", e);
        }

    }

    static async addUsers(message, usersArray){
        try{
            await WordsGameModel.findOneAndUpdate({serverId: message.guild.id}, {players: usersArray})
        } catch(e){
            console.log("error", e);
            message.reply("some error happened", e);
        }

    }

    static async checkUsers(message){
        try{
          const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
          if(!wordsGame.players.length){
              return false;
          } else{
              return true;
          }
        } catch(e){
            console.log("error", e);
            message.reply("some error happened", e);
        }

    }

    static async saveWord(message){
        const word = message.content;
        try{
            const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
            await WordsGameModel.findOneAndUpdate({serverId: message.guild.id}, {usedWords: [word, ...wordsGame.usedWords]});
        } catch(e){
            console.log("error", e);
            message.reply("some error happened", e);
        }
    }

    static async checkWord(message) {
        const word = message.content;
        const result = await axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${this.dictKey}&lang=ru-ru&text=${word}`)
        console.log("api result", result.data, result.data.def[0]?.tr);
        if(!result.data.def[0]?.text){
            message.reply(`нет такого слова в этой букве! (ваше слово:${word})`);
            setTimeout(async () => {
                await message.delete();
            }, 2000);
            return;
        }
        const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
        const usedWords = wordsGame.usedWords;
        if(usedWords){
            const lastword = usedWords[0];
            console.log("last word", lastword); //
            if(lastword.at(-1) === word[0]) {
                if(usedWords.indexOf(word) !== -1){
                    await message.react("❌");
                    await message.reply(`this word has already been used!`);
                    setTimeout(async () => {
                        await message.delete();
                    }, 2000);
                    return;
                }
                await message.react("✅");
                await this.saveWord(message);
            } else {
                await message.react("❌");
                await message.reply(`wrong word! Your word must begin with ${lastword.at(-1)}`);
                setTimeout(async () => {
                    await message.delete();
                }, 2000);
            }
        } else{
            await this.saveWord(message);
            await message.react("✅");
            await this.activate(message);
        }

    }

    static async activate(message){
        const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
        await WordsGameModel.findOneAndUpdate({serverId: message.guild.id}, {gameActive: true});
    }

    static async tellResult() {

    }

    static async editEmbed() {

    }

    static async stopGame(message) {
        const wordsGame = await WordsGameModel.findOne({serverId: message.guild.id});
        if(!wordsGame){
            await message.reply("there is no game. Start the game first with '$wordsgame' ")
        } else{
            await WordsGameModel.findOneAndDelete({serverId: message.guild.id});
            await message.reply("game has been terminated. Thank you for playing");
        }
    }

}

export default WordsGameService;