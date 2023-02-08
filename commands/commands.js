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
import {Canvas, createCanvas, loadImage} from "@napi-rs/canvas";

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
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('displays useful information'),
        async execute(interaction) {
            const row = new ActionRowBuilder()
               .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`likebot 0 0`)
                        .setLabel(`о, классно (0 ❤)`)
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                new ButtonBuilder()
                    .setCustomId(`dislikebot 0 0`)
                     .setLabel(`фигня (0 👎)`)
                    .setStyle(ButtonStyle.Danger),
            );
            const embed = await EmbedService.createEmbed("help", {user, author,  data: null});
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
            .setName('test_img')
            .setDescription('test import img'),
        async execute(interaction) {
            const canvas = createCanvas(800, 450);
            const ctx = canvas.getContext('2d');
            const background = await loadImage("data:image/jpeg;base64,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");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            const attachment = new AttachmentBuilder(canvas.toBuffer("image/jpeg"), "meme.png")
            interaction.reply({ content: "hello", attachment: [attachment]});
        }
    }
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



