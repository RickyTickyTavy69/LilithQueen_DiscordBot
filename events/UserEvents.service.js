import EmbedService from "./Embed.service.js";

class UserEventsService{

    static async showMembers(client, message){
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total amount of ${guild.memberCount} members`
            );
        })
    }

    static async banuser(message, args){
        const role = message.member.roles.cache.find((role) => {
            return role.name === "Админ"
        })
        if(!role){
            await message.reply(`${message.member.user.username}, you don't have the permission to ban users, Admin role required`);
            return;
        }
        const id = args[0].slice(2, args[0].length-1);
        const member = await message.guild.members.cache.get(id);
        console.log("member", member);
        if(!member){
            await message.reply(`member not found. Tag the member you want to ban using the "@" sign`);
            return;
        }
        await EmbedService.createEmbed(message, "blocked", args);
        await member.ban();
    }

    static async unbanUser(message, args){
        const role = message.member.roles.cache.find((role) => {
            return role.name === "Админ"
        })
        if(!role){
            await message.reply(`${message.member.user.username}, you don't have the permission to unban users, Admin role required`);
            return;
        }
        const id = args[0];
        try {
            await message.guild.members.unban(id);
        } catch(e){
            console.error("error", e);
        }
        await EmbedService.createEmbed(message, "unblocked", args);
    }

    static async kickUser(message, args){
        const role = message.member.roles.cache.find((role) => {
            return role.name === "Админ"
        })
        if(!role){
            await message.reply(`${message.member.user.username}, you don't have the permission to kick users, Admin role required`);
            return;
        }
        const id = args[0].slice(2, args[0].length-1);
        const member = await message.guild.members.cache.get(id);
        console.log("member", member);
        if(!member){
            await message.reply(`member not found. Tag the member you want to kick using the "@" sign`);
            return;
        }
        await EmbedService.createEmbed(message, "kicked", args);
        await member.kick();
    }
    static async muteUser(message, args){
        const role = message.member.roles.cache.find((role) => {
            return role.name === "Админ"
        })
        if(!role){
            await message.reply(`${message.member.user.username}, you don't have the permission to mute users, Admin role required`);
            return;
        }
        const id = args[0].slice(2, args[0].length-1);
        const member = await message.guild.members.cache.get(id);
        console.log("member", member);
        if(!member){
            await message.reply(`member not found. Tag the member you want to mute using the "@" sign`);
            return;
        }
        //await EmbedService.createEmbed(message, "muted", args);
        await member.mute();
    }
    static async onJoin(member){
        await EmbedService.createEmbed(null, "join", member);
    }
}

export default UserEventsService;