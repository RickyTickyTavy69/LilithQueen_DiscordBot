import Discord, {EmbedBuilder} from "discord.js";
import {client} from "../index.js";
import WelcomeModel from "../models/welcome.model.js";

class EmbedService{

    static greetingChanelId = "1059224433530765373";

    static async createEmbed(message, action, args){
        if(!message){
            if(action === "join"){
                // Надо сначала проверить, есть ли в бд welcome текст
                const member = args;
                const id = member.guild.id;
                console.log("member", member);
                const welcome = await WelcomeModel.findOne({id});
                const text = welcome.text;
                const username = member.user.username;
                const joinEmbed = new EmbedBuilder()
                    .setTitle(`${welcome? text + ", " + username: `${username} just joined our server! Welcome!` }`)
                    .setImage("https://media.tenor.com/iApvZIbSkdYAAAAC/yorokobu-delighted.gif");
                const chanel = await client.channels.cache.find(channel => channel.id === this.greetingChanelId);
                console.log("sending embed", chanel);
                chanel.send(({embeds: [joinEmbed]}))
                return;
            }

            if(action === "words"){
                const wordsEmbed = new EmbedBuilder()
                    .setTitle(`chanel set for words game. To add players tag them. Write the first word to begin`)
                    .setImage("https://t4.ftcdn.net/jpg/00/24/81/79/240_F_24817953_1qgJExq0jQmJYkifPXnW7lr5M2BGNH8E.jpg")
                    .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'added players:', value: ' nobody...', inline: true }
                );
                const {chanel} = args;
                chanel.send(({embeds: [wordsEmbed]}))
                return;
            }
        }


        console.log("creating embed");
        const content = message.content;
        const author = message.author.username;
        let id;
        if (args) id = (action === "unblocked")? args[0] : args[0].slice(2, args[0].length-1); //unblock user with id, without the mention
        const member = await message.guild.members.cache.get(id);
        const username = (action === "unblocked")? "": member?.user.username;



        switch(action) {
            case "kiss":
                console.log("member", member.user.username)
                const kissEmbed = new EmbedBuilder()
                    .setTitle(`${author} kisses ${username}`)
                    .setDescription("smoooooooch")
                    .setImage("https://media.tenor.com/PAx2p-k3e14AAAAd/asuka-shinji.gif");
                message.channel.send({embeds: [kissEmbed]});
                break;
            case "spank":
                console.log("member", member.user.username);
                const spankEmbed = new EmbedBuilder()
                    .setTitle(`${author} spanks ${username}`)
                    .setDescription("шлёп!")
                    .setImage("https://media.tenor.com/DCzuSR89_4AAAAAC/slap-smack.gif");
                message.channel.send({embeds: [spankEmbed]});
                break;
            case "embrace":
                console.log("member", member.user.username);
                const embraceEmbed = new EmbedBuilder()
                    .setTitle(`${author} embraces ${username}`)
                    .setDescription("it's sooo sweet")
                    .setImage("https://media.tenor.com/7SP16lvmXucAAAAC/anime-cuddle.gif");
                message.channel.send({embeds: [embraceEmbed]});
                break;
            case "avatar":
                console.log("avatar", member.user.avatar);
                const avatarEmbed = new EmbedBuilder()
                    .setTitle(`${author} любуется аватаркой ${username}`)
                    .setColor(0xCC397B)
                    .setURL(member.user.displayAvatarURL({ dynamic: true, size: 512}))
                    .setDescription("it's sooo beautiful")
                    .setAuthor({ name: "как красива" })
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: 'hot hot hot', value: '🔥 🔥 🔥', inline: true },
                        { name: 'hot hot hot', value: '🔥 🔥 🔥', inline: true },
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
                    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512}));
                message.channel.send({embeds: [avatarEmbed]})
                break;
            case "blocked":
                const blockedEmbeed = new EmbedBuilder()
                    .setTitle(`${author} has blocked ${username}`)
                    .setColor(0xCC0E00)
                    .setDescription(`reason: ${args[1] || "unknown"}`)
                    .setAuthor({ name: "banned" })
                    .setThumbnail("https://media.tenor.com/eEoBYl5G0aIAAAAC/skull.gif")
                    .setImage("https://media.tenor.com/a7rXMzToctkAAAAC/bites-za-dusto-jojo-killer-queen-jojo.gif");
                message.channel.send({embeds: [blockedEmbeed]})
                break;
            case "unblocked":
                const id = args[0];
                const unblockMember = await message.guild.members.cache.get(id);
                const unblockUsername = unblockMember.user.username;
                const unblockedEmbeed = new EmbedBuilder()
                    .setTitle(`${author} has unblocked ${unblockUsername}`)
                    .setColor(0xCC0E00)
                    .setDescription(`gratz`)
                    .setAuthor({ name: "unbanned" })
                    .setThumbnail("https://media.tenor.com/_vMUgMADeAUAAAAC/animated-thumbs.gif")
                    .setImage("https://media.tenor.com/RaKNedPHL8IAAAAC/jojo-hail2u.gif");
                message.channel.send({embeds: [unblockedEmbeed]})
                break;
            case "kicked":
                const kickEmbeed = new EmbedBuilder()
                    .setTitle(`${author} has kicked ${username}`)
                    .setColor(0xCC0E00)
                    .setDescription(`goodbye, blue sky`)
                    .setAuthor({ name: "kicked" })
                    .setThumbnail("https://media.tenor.com/eEoBYl5G0aIAAAAC/skull.gif")
                    .setImage("https://media.tenor.com/OTqIFOVS7OkAAAAd/ora.gif");
                message.channel.send({embeds: [kickEmbeed]})
                break;
            case "help":
                console.log("creating help embed");
                const helpEmbed = new EmbedBuilder()
                    .setTitle(`👠Lilith Queen👑`)
                    .setColor(0xCC28C1)
                    .setURL("https://github.com/RickyTickyTavy69/LilithQueen_DiscordBot")
                    .setAuthor({ name: "информация:" })
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: '$clearnew', value: 'deletes new messages in the chanel, if they are not older then 14 days', inline: true },
                        { name: '$updatestatus **status**', value: 'updates the status which the bot shows', inline: true },
                        { name: '$privatecn', value: 'creates a private voice chanel with your name', inline: true },
                        { name: '$kiss @username', value: 'you kiss this user (creates an embed with gif file)', inline: true },
                        { name: '$spank @username', value: 'you spank this user (creates an embed with gif file)', inline: true },
                        { name: '$embrace @username', value: 'you embrace this user (creates an embed with gif file)', inline: true },
                        { name: '$avatar @username', value: 'shows an embed with the avatar of user in bigger size', inline: true },
                        { name: '$block @username', value: 'blocks this user in your server', inline: true },
                        { name: '$unblock @username', value: 'unblocks this user in your server', inline: true },
                        { name: '$throw @username', value: 'throws this user from your server', inline: true },

                    )
                    .setThumbnail("https://media.tenor.com/paD19Hc6f6sAAAAC/safe-word.gif")
                message.channel.send({embeds: [helpEmbed]})
                break;
        }




    }
}

export default EmbedService;