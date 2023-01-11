import axios from "axios";

class GetInfoService{
    
    static async getFilmInfo(message, args){
        const response = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword/bunraku", {
            headers: {
                'X-API-KEY': 'c67e2162-ba5d-4237-8641-73178f8a9c29',
                'Content-Type': 'application/json', 
            }
        })
        message.reply(`response: ${response.data}`);
        console.log(response.data); 
    }

}

export default GetInfoService;