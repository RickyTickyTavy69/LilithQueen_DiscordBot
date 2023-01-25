import {SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import EmbedService from "../events/Embed.service.js";

// import models
import ServerInfoModel from "../models/serverInfoModel.js";

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
                                    .setCustomId(`wrong button red`)
                                    .setLabel(`don't verify me`)
                                    .setStyle(ButtonStyle.Danger),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId(`wrong button blue`)
                                .setLabel(`где я?`)
                                .setStyle(ButtonStyle.Primary),
                            )
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId(`wrong button grey`)
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

]



