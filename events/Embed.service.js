import Discord, {EmbedBuilder} from "discord.js";
//import {client} from "../index.js";
//import WelcomeModel from "../models/welcome.model.js";
import embedImages from "../assets/embed/embedImages.js";

class EmbedService{

    static greetingChanelId = "1059224433530765373";

    static async createEmbed(action, args){             // here must be an object like this {user: {}, data: {}}
        /*if(!message){                             // and then I will see if user or other data is provided.
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
        const username = (action === "unblocked")? "": member?.user.username;*/
        const user = args?.user;
        const author = args?.author;
        const data = args?.data;
        const member = data?.member;

        switch(action) {
            //actions
            case "kiss":
                const kissImages = embedImages.kiss;
                const kissNumber = Math.floor((Math.random() * kissImages.length));
                const kissEmbed = new EmbedBuilder()
                    .setTitle(`${author} kisses ${user}`)
                    .setDescription("smoooooooch")
                    .setImage(kissImages[kissNumber]);
                return kissEmbed
            case "hit":
                const hitImages = embedImages.hit;
                const hitNumber = Math.floor((Math.random() * hitImages.length));
                const hitEmbed = new EmbedBuilder()
                    .setTitle(`${author} hits ${user}`)
                    .setDescription("oh, it hurts")
                    .setImage(hitImages[hitNumber]);
                return hitEmbed;
            case "hitback":
                const hitbackImages = embedImages.hit;
                const hitbackNumber = Math.floor((Math.random() * hitbackImages.length));
                const hitbackEmbed = new EmbedBuilder()
                    .setTitle(`${author} hits ${user}`)
                    .setDescription("oh, it hurts! au!")
                    .setImage(hitbackImages[hitbackNumber]);
                return hitbackEmbed;
            case "kneeldown":
                const kneelDownImages = embedImages.kneeldown;
                const kneelDownNumber = Math.floor((Math.random() * kneelDownImages.length));
                const kneelDownEmbed = new EmbedBuilder()
                    .setTitle(`${author} kneels down before ${user}`)
                    .setDescription("yes, my mistress/master")
                    .setImage(kneelDownImages[kneelDownNumber]);
                return kneelDownEmbed;
            case "hug":
                const hugImages = embedImages.hug;
                const hugNumber = Math.floor((Math.random() * hugImages.length));
                const hugEmbed = new EmbedBuilder()
                    .setTitle(`${author} embraces ${user}`)
                    .setDescription("it's sooo sweet")
                    .setImage(hugImages[hugNumber]);
                return hugEmbed;
                //avatar
            case "ava":
                const avatarEmbed = new EmbedBuilder()
                    .setTitle(`${author} любуется аватаркой ${user}`)
                    .setColor(0xCC397B)
                    .setDescription("it's sooo beautiful")
                    .setAuthor({ name: "как красива" })
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: 'hot hot hot', value: '🔥 🔥 🔥', inline: true },
                        { name: 'hot hot hot', value: '🔥 🔥 🔥', inline: true },
                    )
                    .setThumbnail(member.user.displayAvatarURL())
                    .setImage(member.user.displayAvatarURL({ dynamic: true , size: 2048 , format: "png" }))
                return avatarEmbed;
            case "blocked":
                const blockedEmbeed = new EmbedBuilder()
                    .setTitle(`${author} has blocked ${username}`)
                    .setColor(0xCC0E00)
                    .setDescription(`reason: ${args[1] || "unknown"}`)
                    .setAuthor({ name: "banned" })
                    .setThumbnail("https://media.tenor.com/eEoBYl5G0aIAAAAC/skull.gif")
                    .setImage("https://media.tenor.com/a7rXMzToctkAAAAC/bites-za-dusto-jojo-killer-queen-jojo.gif");
                return blockedEmbeed;
            case "unblocked":
                const id = args[0];
                const unblockMember = await message.guild.members.cache.get(id);
                const unblockUsername = unblockMember.user.username;
                const unblockedEmbed = new EmbedBuilder()
                    .setTitle(`${author} has unblocked ${unblockUsername}`)
                    .setColor(0xCC0E00)
                    .setDescription(`gratz`)
                    .setAuthor({ name: "unbanned" })
                    .setThumbnail("https://media.tenor.com/_vMUgMADeAUAAAAC/animated-thumbs.gif")
                    .setImage("https://media.tenor.com/RaKNedPHL8IAAAAC/jojo-hail2u.gif");
                return unblockedEmbed
            case "kicked":
                const kickEmbeed = new EmbedBuilder()
                    .setTitle(`${author} has kicked ${username}`)
                    .setColor(0xCC0E00)
                    .setDescription(`goodbye, blue sky`)
                    .setAuthor({ name: "kicked" })
                    .setThumbnail("https://media.tenor.com/eEoBYl5G0aIAAAAC/skull.gif")
                    .setImage("https://media.tenor.com/OTqIFOVS7OkAAAAd/ora.gif");
                return kickEmbeed;
            case "help":
                console.log("creating help embed");
                const helpEmbed = new EmbedBuilder()
                    .setTitle(`👠Lilith Queen👑`)
                    .setColor(0xCC28C1)
                    .setURL("https://github.com/RickyTickyTavy69/LilithQueen_DiscordBot")
                    .setAuthor({ name: "информация:" })
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: '/help', value: 'list of bot commands', inline: true },
                        { name: '/userinfo + @user', value: 'displays user info', inline: true },
                        { name: '/serverinfo', value: 'displays info of a server', inline: true },
                        { name: '/hit + @user', value: 'hit this user', inline: true },
                        { name: '/kiss +  @user', value: 'you kiss this user', inline: true },
                        { name: '/hug + @user', value: 'you hug this user', inline: true },
                        { name: '/ava + @user', value: 'shows the avatar of this user', inline: true },
                        { name: '/setprivatevoiceid + #channel', value: 'sets a channel to create private voice channels', inline: true },
                        { name: '/setunverified + @role', value: 'sets an unverified role for unverified users', inline: true },
                        { name: '/setdefaultrole + @role', value: 'sets a default role for verified users', inline: true },
                        { name: '/setverify + #channel', value: 'creates a verification buttons in this channel (!!! use /setunverified & /setdefaultrole before, else this command will not work !!!)', inline: true },
                        { name: '/setwelcome + #channel', value: 'creates a channel to display welcome messages', inline: true },
                        { name: '/setgoodbye + #channel', value: 'creates a channel to display goodbye messages', inline: true },
                        { name: '/set_words + #channel', value: 'creates a channel fot the words game', inline: true },
                        { name: '/fresco + frase', value: 'creates a meme with Jacque Fresco', inline: true },
                        { name: '/weather + city', value: 'shows the weather in your city', inline: true },
                    )
                    .setThumbnail("https://media.tenor.com/paD19Hc6f6sAAAAC/safe-word.gif")
                return helpEmbed;
                // embed for the verification
            case "verification":
                console.log("creating verification embed");
                const verifyembed = new EmbedBuilder()
                    .setTitle(`Verification`)
                    .setColor(0x4AC837)
                    .setAuthor({ name: "верификация:" })
                    .setImage("https://media.tenor.com/dsbsIYy1qD4AAAAC/lady-cop-police.gif")
                    .setThumbnail("https://media.tenor.com/mF3MxQJVWQIAAAAC/lune-luna.gif")
                return verifyembed;
        }
    }
}

export default EmbedService;