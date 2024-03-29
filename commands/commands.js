import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder, Attachment, AttachmentBuilder
} from "discord.js";
import EmbedService from "../events/Embed.service.js";
import {Player} from "discord-player";
import {QueryType} from "discord-player";

/*import {client} from "./../index.js";
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    }
})*/

// import models
import ServerInfoModel from "../models/serverInfoModel.js";
import wordsGameModel from "../models/wordsGameModel.js";
import WordsGameModel from "../models/wordsGameModel.js";
import pkg from "@napi-rs/canvas";
const {createCanvas, loadImage, GlobalFonts} = pkg;
import {resolve, join, dirname} from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import weatherRequestMethods from "../api/weatherRequestMethods.js";
import getFilmMethods from "../api/getFilmMethods.js";
import {UserMethods} from "../api/userMethods.js";

export default [{
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Ping-Ping!'),
    async execute(interaction) {
        await interaction.reply('Ping-Ping!');
    },
},

{
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
},

{
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Provides information about the server.'),
    async execute(interaction) {
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
},

//*=============commands for creating embeds*=====================//

{
    data: new SlashCommandBuilder()
        .setName('hit')
        .setDescription('you hit mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user to hit')
                .setRequired(true)
        ),
    async execute(interaction) {
        //adding some interactions buttons//
        const user = interaction.options.getUser("user").username;
        const author = interaction.user.username;
        const authorId = interaction.user.id;
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`hitback ${authorId}`)
                    .setLabel(`hit ${author} back`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`kneeldown ${authorId}`)
                    .setLabel(`kneel down before ${author}`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`runaway ${authorId}`)
                    .setLabel(`run away from ${author}`)
                    .setStyle(ButtonStyle.Secondary),
            );
        const embed = await EmbedService.createEmbed("hit", {user, author,  data: null});
        interaction.reply({embeds: [embed], components: [row]});
    },
},
    {
        data: new SlashCommandBuilder()
            .setName('kiss')
            .setDescription('you kiss mentioned user')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('user to kiss')
                    .setRequired(true)
            ),
        async execute(interaction) {
            const user = interaction.options.getUser("user").username;
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`hug ${author}`)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`kissback ${authorId}`)
                        .setLabel(`kiss ${author} back`)
                        .setStyle(ButtonStyle.Secondary),
                );
            const embed = await EmbedService.createEmbed("kiss", {user, author,  data: null});
            interaction.reply({embeds: [embed], components: [row]});
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('hug')
            .setDescription('you hug mentioned user')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('user to hug')
                    .setRequired(true)
            ),
        async execute(interaction) {
            //adding some interactions buttons//
            const user = interaction.options.getUser("user").username;
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`hug ${author}`)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`kiss ${authorId}`)
                        .setLabel(`kiss ${author}`)
                        .setStyle(ButtonStyle.Secondary),
                );
            const embed = await EmbedService.createEmbed("hug", {user, author,  data: null});
            interaction.reply({embeds: [embed], components: [row]});
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('ava')
            .setDescription('shows the avatar of mentioned user')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('user to show avatar')
                    .setRequired(true)
            ),
        async execute(interaction) {
            const user = interaction.options.getUser("user").username;
            const userId = interaction.options.getUser("user").id;
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const guild = interaction.guild;
            const member = guild.members.cache.get(userId);
            const row = new ActionRowBuilder()
               .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`like ${userId} 0 0`)
                        .setLabel(`Like (0 ❤)`)
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                new ButtonBuilder()
                    .setCustomId(`dislike ${userId} 0 0`)
                     .setLabel(`Dislike (0 💀)`)
                    .setStyle(ButtonStyle.Danger),
            );
            const embed = await EmbedService.createEmbed("ava", {user, author,  data: {member}})
            console.log("embed is...", embed);
            interaction.reply({embeds: [embed], components: [row]});
        },
    },
    //*=============commands for private channels*=====================//
    {
        data: new SlashCommandBuilder()
            .setName('setprivatevoiceid')
            .setDescription('sets an id for a private voice channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set private channel')
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")){
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
                return;
            }
            try{
                const guildID = interaction.guild.id;
                const channelId = interaction.options.getChannel("channel").id;
                const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                if(serverInfo){
                    console.log(`found serverInfo, ${serverInfo}`);
                    await serverInfo.update({privateVoice: channelId});
                    await interaction.reply(`Set ID for private voice creator ID: ${channelId}`);
                } else{
                    const newServerInfo = new ServerInfoModel({
                        serverId: guildID,
                        privateVoice: channelId,
                    })
                    await newServerInfo.save();
                    await interaction.reply(`added server to db. Set ID for private voice creator ID ${channelId}`)
                }
            } catch(e){
                await interaction.reply(`извините, произошла ашипка ${e}`)
            }


        },
    },
    //command for setting verification channel
    {
        data: new SlashCommandBuilder()
            .setName('setverify')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")){
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                    const guildID = interaction.guild.id;
                    const channelId = interaction.options.getChannel("channel").id;
                    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                    if (serverInfo) {
                        console.log(`found serverInfo, ${serverInfo}`);
                        await serverInfo.update({verificationChannel: channelId});
                    } else {
                        const newServerInfo = new ServerInfoModel({
                            serverId: guildID,
                            verificationChannel: channelId,
                        })
                        await newServerInfo.save();
                    }
                        const verifyEmbed = await EmbedService.createEmbed("verification", null);
                        console.log("verifyembed", verifyEmbed);
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`verify`)
                                    .setLabel(`Verify me`)
                                    .setStyle(ButtonStyle.Success),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`verifwrongred`)
                                    .setLabel(`don't verify me`)
                                    .setStyle(ButtonStyle.Danger),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId(`verifwrongblue`)
                                .setLabel(`где я?`)
                                .setStyle(ButtonStyle.Primary),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId(`verifwronggrey`)
                                .setLabel(`не нажимать сюда`)
                                .setStyle(ButtonStyle.Secondary),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel(`ссылка`)
                                    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                                    .setStyle(ButtonStyle.Link),
                            )
                        await interaction.reply({ content: "set verify channel", embeds: [verifyEmbed], components: [row]});
            }

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('setunverified')
            .setDescription('sets unverified role')
            .addRoleOption(option =>
            option.setName("unverified_role")
                .setDescription("a role for an unverified user")
                .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const unverifiedrole = interaction.options.getRole("unverified_role");
                    console.log("role", unverifiedrole);
                    const unverifiedroleID = unverifiedrole.id;
                    const guildID = interaction.guild.id;
                    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                    if (serverInfo) {
                        console.log(`found serverInfo, ${serverInfo}`);
                        await ServerInfoModel.findOneAndUpdate({serverId: guildID}, {unverifiedroleID: unverifiedroleID});
                    } else {
                        const newServerInfo = new ServerInfoModel({
                            serverId: guildID,
                            unverifiedroleID,
                        })
                        await newServerInfo.save();
                    }
                    interaction.reply({
                        content: `unverified role updated. role ID ${unverifiedroleID}`,
                        ephemeral: true,
                    });
                } catch (e) {
                    console.log("error", e);
                    interaction.reply(`some error happened, we are sorry for this. You can find help in the support server ${e}`);
                }
            }

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('setdefaultrole')
            .setDescription('sets the default user role')
            .addRoleOption(option =>
                option.setName("default_role")
                    .setDescription("a role for an verified user")
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const defaultRoleID = interaction.options.getRole("default_role").id;
                    const guildID = interaction.guild.id;
                    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                    if (serverInfo) {
                        console.log(`found serverInfo, ${serverInfo}`);
                        await ServerInfoModel.findOneAndUpdate({serverId: guildID},{defaultRoleID : defaultRoleID});
                    } else {
                        const newServerInfo = new ServerInfoModel({
                            serverId: guildID,
                            defaultRoleID,
                        })
                        await newServerInfo.save();
                    }
                    interaction.reply({
                        content: `default updated. role ID ${defaultRoleID}`,
                        ephemeral: true,
                    });
                } catch (e) {
                    interaction.reply({content: "some error happened, we are sorry for this. You can find help in the support server", ephemeral: true});
                }
            }

        },
    },
    // commands for welcome and goodbye channels
    {
        data: new SlashCommandBuilder()
            .setName('setwelcome')
            .setDescription('sets the welcome channel')
            .addChannelOption(option =>
                option.setName("welcome_channel")
                    .setDescription("a channel for welcome messages")
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const welcomeChannelID = interaction.options.getChannel("welcome_channel").id;
                    const guildID = interaction.guild.id;
                    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                    if (serverInfo) {
                        console.log(`found serverInfo, ${serverInfo}`);
                        await ServerInfoModel.findOneAndUpdate({serverId: guildID}, {welcomeChannelId: welcomeChannelID});
                    } else {
                        const newServerInfo = new ServerInfoModel({
                            serverId: guildID,
                            welcomeChannelID,
                        })
                        await newServerInfo.save();
                    }
                    interaction.reply({
                        content: `set welcomeChannel, ID ${welcomeChannelID}`,
                        ephemeral: true,
                    });
                } catch (e) {
                    interaction.reply({content: "some error happened, we are sorry for this. You can find help in the support server", ephemeral: true});
                }
            }

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('setgoodbye')
            .setDescription('sets the goodbye channel')
            .addChannelOption(option =>
                option.setName("goodbye_channel")
                    .setDescription("a channel for goodbye messages")
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const goodbyeChannelID = interaction.options.getChannel("goodbye_channel").id;
                    const guildID = interaction.guild.id;
                    const serverInfo = await ServerInfoModel.findOne({serverId: guildID});
                    if (serverInfo) {
                        console.log(`found serverInfo, ${serverInfo}`);
                        await ServerInfoModel.findOneAndUpdate({serverId: guildID}, {goodbyeChannelId: goodbyeChannelID});
                    } else {
                        const newServerInfo = new ServerInfoModel({
                            serverId: guildID,
                            goodbyeChannelID,
                        })
                        await newServerInfo.save();
                    }
                    interaction.reply({
                        content: `set goodbyechannel, ID ${goodbyeChannelID}`,
                        ephemeral: true,
                    });
                } catch (e) {
                    interaction.reply({content: "some error happened, we are sorry for this. You can find help in the support server", ephemeral: true});
                }
            }

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('set_words')
            .setDescription('sets the words game channel')
            .addChannelOption(option =>
                option.setName("words_channel")
                    .setDescription("a channel for words game")
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const WordsChannelId = interaction.options.getChannel("words_channel").id;
                    const guildID = interaction.guild.id;
                    const wordsGame = await WordsGameModel.findOne({serverId: guildID});
                    if (wordsGame) {
                        console.log("already set")
                       interaction.reply({content: "you have already set an ID for the words game channel", ephemeral: true});
                    } else {
                        const wordsGame = new WordsGameModel({
                            serverId: guildID,
                            channelId: WordsChannelId,
                        })
                        await wordsGame.save();
                        interaction.reply({
                            content: `set wordsgamechannel, ID ${WordsChannelId}`,
                            ephemeral: true,
                        });
                    }
                } catch (e) {
                    console.log("error", e);
                    interaction.reply({content: "some error happened, we are sorry for this. You can find help in the support server", ephemeral: true});
                }
            }

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('fresco')
            .setDescription('test import img')
            .addStringOption(option => (
                option
                    .setName('quote')
                    .setDescription('some clever frase')
                    .setRequired(true)
            )),
        async execute(interaction) {
            const quote = interaction.options.getString('quote');
            const canvas = createCanvas(567, 281);
            const ctx = canvas.getContext('2d');
            const background = await loadImage("https://memepedia.ru/wp-content/uploads/2020/02/zhak-fresko-memy-1.jpg");
            ctx.drawImage(background, 0, 0); // no width / height necessary?
            GlobalFonts.registerFromPath(join(__dirname, "..", "/assets/fonts", "Roboto.ttf"), "roboto");
            GlobalFonts.registerFromPath(join(__dirname, "..", "/assets/fonts", "RobotoSlab.ttf"), "robotoSlab");
            ctx.font = "30px robotoSlab";
            ctx.fillStyle = "rgba(7,5,3,0.8)";
            let quoteArray = quote.split(" ");
            ctx.fillText(quote, 80, 110, 250);
            ctx.textAlign = "center";
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'meme.png' });
            interaction.reply({files: [attachment]});
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('weather')
            .setDescription('look up the weather')
            .addStringOption(option => (
                option
                    .setName("location")
                    .setDescription("location to look up the weather")
                    .setRequired(true)
            )),
        async execute(interaction) {
            const location = interaction.options.getString("location");
            const {lat, long} = await weatherRequestMethods.getLocation(location, interaction);
            if(lat && long){
                await weatherRequestMethods.sendTemperatureEmbed(lat, long, location, interaction);
            }
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('bot commands info'),
        async execute(interaction) {
            const HelpEmbed = await EmbedService.createEmbed("help", null);
            interaction.reply({embeds: [HelpEmbed]});
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('film_info')
            .setDescription('info about a film')
            .addStringOption((option => (
                option
                    .setName("film")
                    .setDescription("a name of a film")
                    .setRequired(true)
            ))),
        async execute(interaction) {
            const film = interaction.options.getString("film");
            const FilmEmbed = await getFilmMethods.getFilmInfo(film)
            interaction.reply({embeds: [FilmEmbed]});
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('set_guess_words')
            .setDescription('sets the channel for guess words')
            .addChannelOption(option =>
                option.setName("guess_words_channel")
                    .setDescription("a channel for guess words game")
                    .setRequired(true)
            ),
        async execute(interaction) {
            if(!interaction.member?.permissions.has("ADMINISTRATOR")) {
                interaction.reply(`you don't have permissions to use this command. Admin permission required`);
            } else {
                try {
                    const WordsChannelId = interaction.options.getChannel("words_channel").id;
                    const guildID = interaction.guild.id;
                    const wordsGame = await WordsGameModel.findOne({serverId: guildID});
                    if (wordsGame) {
                        console.log("already set")
                        interaction.reply({content: "you have already set an ID for the words game channel", ephemeral: true});
                    } else {
                        const wordsGame = new WordsGameModel({
                            serverId: guildID,
                            channelId: WordsChannelId,
                        })
                        await wordsGame.save();
                        interaction.reply({
                            content: `set wordsgamechannel, ID ${WordsChannelId}`,
                            ephemeral: true,
                        });
                    }
                } catch (e) {
                    console.log("error", e);
                    interaction.reply({content: "some error happened, we are sorry for this. You can find help in the support server", ephemeral: true});
                }
            }

        },
    },

    {
        data: new SlashCommandBuilder()
            .setName('check_users')
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setDescription('кого нибудь чекнуть?')
            .addStringOption((option => (
                option
                    .setName("user")
                    .setDescription("кого чекнуть")
                    .setRequired(false)
            ))),
        async execute(interaction) {
            const user = interaction.options.getString("user");
            try{
                const checked = UserMethods.check(user, interaction);
                if (checked)
                    interaction.reply({content: 'я всех чекнула', ephemeral: true});
            } catch (e){
                interaction.reply({content: " oh, shit, I'm sorry. An error happened", ephemeral: true })
            }
            interaction.reply({content: 'process ended', ephemeral: true});
        }
    },


    //commands music player

    /*{
        data: new SlashCommandBuilder()
            .setName('play')
            .setDescription('plays songs for you')
            .addSubcommand((subcommand) =>
            subcommand.setName("song")
                .setDescription("name of the song you want to play")
                .addStringOption((option) =>
                    option.setName("url")
                        .setDescription("the song url")
                        .setRequired(true)
                )
            )
            .addSubcommand((subcommand) =>
                subcommand.setName("playlist")
                    .setDescription("loads a playlist of songs from the url")
                    .addStringOption((option) =>
                        option.setName("url")
                            .setDescription("the playlist url")
                            .setRequired(true)
                    )
            )
            .addSubcommand((subcommand) =>
                subcommand.setName("search")
                    .setDescription("searches for song based on provided keywords")
                    .addStringOption((option) =>
                        option.setName("searchTerms")
                            .setDescription("the search keywords")
                            .setRequired(true)
                    )
            ),

        async execute(interaction) {
            if(!interaction.member.voice.channel){
                return interaction.editReply("you need to be inside voice channel to use this command");
            }

            const queue = await client.player.createQueue(interaction.guild);
            if(!queue.connection){
                await queue.connect(interaction.member.voice.channel);

                const embed = new EmbedBuilder()

                if(interaction.options.getSubcommand() === "song"){
                    const url = interaction.options.getString("url");
                    const result = await client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_VIDEO
                    });
                    if(result.tracks.length === 0){
                        return interaction.editReply("no results found");
                    }
                    const song = result.tracks[0];
                    await queue.addTrack(song);
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({text: `Duration: ${song.duration}`})
                } else if(interaction.options.getSubcommand() === "playlist"){
                    const url = interaction.options.getString("url");
                    const result = await client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_PLAYLIST
                    });
                    if(result.tracks.length === 0){
                        return interaction.editReply("no results found");
                    }
                    const playlist = result.playlist;
                    await queue.addTracks(result.tracks);
                    embed
                        .setDescription(`**[${playlist.title}](${playlist.url})** has been added to the queue`)
                        .setThumbnail(playlist.thumbnail)
                } else if(interaction.options.getSubcommand() === "search"){
                    const url = interaction.options.getString("searchTerms");
                    const result = await client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.AUTO
                    });
                    if(result.tracks.length === 0){
                        return interaction.editReply("no results found");
                    }
                    const song = result.tracks[0];
                    await queue.addTrack(song);
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({text: `Duration: ${song.duration}`})
                }

            }
        }

    },
    {
        data: new SlashCommandBuilder()
            .setName('pause')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {

        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('exit')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {

        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('queue')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {

        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('resume')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {

        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('skip')
            .setDescription('sets an id for the verification channel')
            .addChannelOption(option =>
                option
                    .setName('channel')
                    .setDescription('channel to set verification')
                    .setRequired(true)
            ),
        async execute(interaction) {

        }
    }*/
]



