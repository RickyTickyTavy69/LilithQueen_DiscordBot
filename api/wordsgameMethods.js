import axios from "axios";
import wordsGameModel from "../models/wordsGameModel.js";
import WordsGameModel from "../models/wordsGameModel.js";

class WordsgameMethods{
    static async lookUp(word, message){
        console.log(`this is word ${word}`)
        const TOKEN = process.env.LINGVO_TOKEN;
        try{
            const result = await axios.get(`https://developers.lingvolive.com/api/v1/Translation?text=${word}&srcLang=1049&dstLang=1033&isCaseSensitive=false`, {
                headers: {
                    Authorization: `Bearer ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFMk56VTNPRE13TWpRc0lrMXZaR1ZzSWpwN0lrTm9ZWEpoWTNSbGNuTlFaWEpFWVhraU9qVXdNREF3TENKVmMyVnlTV1FpT2pjek9ESXNJbFZ1YVhGMVpVbGtJam9pT1Rrd04yVXhOamN0TnpaaU1DMDBNV016TFdFelptUXRObVV3WWpJd1pEa3dOelZrSW4xOS5pU3BhbnlKY2J4RDB3Tm0taktUbTVtNDg5bjZWV0pVZHhlVFhVS2JSNmJv`
                }
            });
            message.react("✅");
            return true;
        } catch(e){
            message.react("❌");
            await message.reply(`нет такого слова в словаре. Вы написали ${word}`);
            message.delete();
            console.log("error", e);
            return false;
        }


    }

    static async checkWord(word, message){
        try{
            const guildId = message.guild.id;
            const wordsGame = await wordsGameModel.findOne({serverId: guildId});
            const words = wordsGame.usedWords;
            const wordLowCase = word.toLowerCase();
            //console.log(`right word is ${rightWord}`)
            if(!words.length){
                return true;
            } else{
                if(words.includes(wordLowCase)){
                    await message.reply(`такое слово уже использовали. Вы написали ${word}`);
                    message.delete()
                    return false
                }
                const lastWord = words.at(-1);
                const rightWord = lastWord.replace("ь", "").replace("ъ", "").replace("ы", "");
                const LastLetter = rightWord.at(-1);
                console.log(`first letter ${LastLetter}, second letter is ${wordLowCase[0]}`)
                if(LastLetter.toLowerCase() !== wordLowCase[0]){
                    await message.reply(`слово должно начинаться на букву ${LastLetter}. Ваше слово начинается на букву ${wordLowCase[0]}`)
                    message.delete()
                    return false
                }
                return true
            }
        }catch (e) {
            message.reply(`что то пошло не так, попробуйте ещё раз`);
        }

    }

    static async auth(){
        const API_KEY = process.env.LINGVO_API_KEY;
        const token = await axios.post("https://developers.lingvolive.com/api/v1.1/authenticate", {}, {
            headers: {
                Authorization: `Basic ${API_KEY}`
            }
        })
        return token;
    }
}

export default WordsgameMethods;