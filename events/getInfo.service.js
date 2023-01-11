import axios from "axios";
import Discord, {EmbedBuilder} from "discord.js";

class GetInfoService{
    
    static async getFilmInfo(message, args){
        console.log("args[0]", args[0]);
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${args.join(" ")}`, {
            headers: {
                'X-API-KEY': 'c67e2162-ba5d-4237-8641-73178f8a9c29',
                'Content-Type': 'application/json', 
            }
        })
        const filmEmbed = new EmbedBuilder()
        .setTitle(`${response.data.films[0].nameRu}`)
        .setColor(0xCC397B)
        .setDescription(`${response.data.films[0].description}`)
        .setImage(`${response.data.films[0].posterUrl}`);
        await message.channel.send({embeds: [filmEmbed]});
        console.log(response.data); 
    }

}

export default GetInfoService;