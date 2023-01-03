import {ChannelType, Collection} from "discord.js";

class ManageChanelsService{
    static async createPrivate(message){
        //const voiceCollection = new Collection();
        //const member = message.member;
        const chanelName = message.author.username;
        const userId = message.author.id;
        //console.log("author", author);
        console.log("message", userId);

        const chanel = await message.guild.channels.create({
            name: chanelName,
            type: ChannelType.GuildVoice,
            parent: "1046508233990340618",
        });

        //await member.voice.setChannel(chanel);
        //voiceCollection.set(userId, chanel.id);
    }
}

export default ManageChanelsService;