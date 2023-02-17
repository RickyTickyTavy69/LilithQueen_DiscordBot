import {client} from "../index.js";

class CheckersAuthController{
    //nickname
    static async Auth(){
       const guild = await client.guilds.cache.get("980952539245740072");
       const members = await guild.members.fetch();
       //console.log("guildmembers", members)
       members.map((member) => {
           console.log(member.user.username)
       })
    }
}

export default CheckersAuthController;