import axios from "axios";

class WordsgameMethods{
    static async lookUp(word){
        const TOKEN = process.env.LINGVO_TOKEN;
        const result = await axios.get(`https://developers.lingvolive.com/api/v1/Translation?text=${word}&srcLang=${1049}&dstLang=${1033}&isCaseSensitive=${false}`)
        return result;
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