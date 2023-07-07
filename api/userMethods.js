import {client} from "../index.js";
export class UserMethods{
    static async check(user, interaction){
        console.log("interaction is", interaction);
        const guildId = interaction.guildId;
        const guild = await client.guilds.fetch(guildId);
        const members = await guild.members.fetch();
        console.log("members are", members);
    }
}