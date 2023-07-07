import wordsgameMethods from "../api/wordsgameMethods.js";
import WordsGameModel from "../models/wordsGameModel.js";

export class WordsGame{
    static async HandleNewWord(message){
        if(message.content.split(" ").length > 1){
            await message.reply("please, use just one word, not more then one.");
            await message.delete();
            return;
        }
        const word = message.content;
        const result = await wordsgameMethods.lookUp(word, message);
        if(result) {
            const checked = await wordsgameMethods.checkWord(word, message);
            if (checked) {
                const words = wordsChannel.usedWords;
                words.push(word.toLowerCase());
                await WordsGameModel.findOneAndUpdate({serverId: guildId, usedWords: words});
                console.log(`saved word ${word}`);
            }
        }
    }
}