//just functions without commands, which are executed by pressing a button

import EmbedService from "../events/Embed.service.js";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import {client} from "./../index.js";
import ServerInfoModel from "../models/serverInfoModel.js";

export default [
    {
        data: {
          name: "hitback"
        },
        async execute(interaction, targetUser) {
            const user = targetUser.username; // как сделать, чтобы юзер, нажавший на кнопку получил имя автора эмбеда?
            console.log(`user is ${targetUser}`);
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const embed = await EmbedService.createEmbed("hitback", {user, author, data: null});
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
            interaction.reply({embeds: [embed], components: [row]});
        }
    },
    {
        data: {
            name: "kneeldown"
        },
        async execute(interaction, targetUser) {
            const user = targetUser.username;
            console.log(`user is ${targetUser}`);
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const embed = await EmbedService.createEmbed("kneeldown", {user, author, data: null});
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author} again`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`embrace ${author}`)
                        .setStyle(ButtonStyle.Primary)
                );
            interaction.reply({embeds: [embed], components: [row]});
        }
    },
    {
        data: {
            name: "hug"
        },
        async execute(interaction, targetUser) {
            const user = targetUser.username;
            console.log(`user is ${targetUser}`);
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const embed = await EmbedService.createEmbed("hug", {user, author, data: null});
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`embrace ${author}`)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`kiss ${authorId}`)
                        .setLabel(`kiss ${author}`)
                        .setStyle(ButtonStyle.Success),
                );
            interaction.reply({embeds: [embed], components: [row]});
        }
    },
    {
        data: {
            name: "kiss"
        },
        async execute(interaction, targetUser) {
            const user = targetUser.username;
            console.log(`user is ${targetUser}`);
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const embed = await EmbedService.createEmbed("kiss", {user, author, data: null});
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`embrace ${author}`)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`kiss ${authorId}`)
                        .setLabel(`kiss ${author}`)
                        .setStyle(ButtonStyle.Success),
                );
            interaction.reply({embeds: [embed], components: [row]});
        }
    },
    {
        data: {
            name: "kiss"
        },
        async execute(interaction, targetUser) {
            const user = targetUser.username;
            console.log(`user is ${targetUser}`);
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const embed = await EmbedService.createEmbed("kiss", {user, author, data: null});
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`hitback ${authorId}`)
                        .setLabel(`hit ${author}`)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`hug ${authorId}`)
                        .setLabel(`embrace ${author}`)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`kiss ${authorId}`)
                        .setLabel(`kiss ${author}`)
                        .setStyle(ButtonStyle.Success),
                );
            interaction.reply({embeds: [embed], components: [row]});
        }
    },
    {
        data: {
            name: "like"
        },
        async execute(interaction, targetUser) {
            const message = interaction.message;
            const user = targetUser.username;
            const userId = targetUser.id;
            const author = interaction.user.username;
            const authorId = interaction.user.id;
            const guild = interaction.guild;
            const member = guild.members.cache.get(userId);
            const like = +interaction.customId.split(" ")[2] + 1;
            const dislike = +interaction.customId.split(" ")[3]
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`like ${userId} ${like} ${dislike}`)
                        .setLabel(`Like (${like} ❤)`)
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`dislike ${userId} ${like} ${dislike}`)
                        .setLabel(`Dislike (${dislike} 💀)`)
                        .setStyle(ButtonStyle.Danger),
                )
            const embed = await EmbedService.createEmbed("ava", {user, author,  data: {member}});
            console.log("embed is...", embed);
            message.edit({embeds: [embed], components: [row]});
            interaction.reply({content: "you liked the avatar", ephemeral: true});
        }
    },
    {
        data: {
            name: "dislike"
        },
        async execute(interaction, targetUser) {
            const message = interaction.message;
            const user = targetUser.username;
            const userId = targetUser.id;
            const author = interaction.user.username
            const authorId = interaction.user.id;
            const guild = interaction.guild;
            const member = guild.members.cache.get(userId);
            const like = +interaction.customId.split(" ")[2];
            const dislike = +interaction.customId.split(" ")[3] + 1;
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`like ${userId} ${like} ${dislike}`)
                        .setLabel(`Like (${like} ❤)`)
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`dislike ${userId} ${like} ${dislike}`)
                        .setLabel(`Dislike (${dislike} 💀)`)
                        .setStyle(ButtonStyle.Danger),
                );
            const embed = await EmbedService.createEmbed("ava", {user, author,  data: {member}})
            console.log("embed is...", embed);
            message.edit({embeds: [embed], components: [row]});
            interaction.reply({content: "you disliked the avatar", ephemeral: true});
        }
    },
    // commands for verification buttons
    {
        data: {
            name: "verify"
        },
        async execute(interaction) {
            const member = interaction.member;
            const guildId = interaction.guild.id;
            const serverInfo = await ServerInfoModel.findOne({serverId: guildId});
            const userRoleId = serverInfo.defaultRoleID;
            const unverifiedRoleId = serverInfo.unverifiedroleID;
            console.log("unverifiedID", unverifiedRoleId);
            const unverifiedRole = await member.guild.roles.cache.get(unverifiedRoleId);
            console.log("unverifiedRole", unverifiedRole);
            const userRole = member.guild.roles.cache.get(userRoleId);
            member.roles.remove(unverifiedRole);
            member.roles.add(userRole);
            const username = interaction.user.username;
            interaction.reply({content: `${username}, вы успешно верифицировались. Добро пожаловать!`, ephemeral: true});
        }
    },
    {
        data: {
            name: "verifwrongred"
        },
        async execute(interaction) {
            const username = interaction.user.username;
            interaction.reply({content: `${username}, вы всё ещё не верифицировались. Это красная кнопка. Нажмите на зелёную кнопку`, ephemeral: true});
        }
    },
    {
        data: {
            name: "verifwrongblue"
        },
        async execute(interaction) {
            interaction.reply({content: `Вы на сервере ${interaction.guild.name}, это отличный сервер где можно развлечься, найти друзей и хорошо провести время! (чтобы зайти нажмите зелёную кнопку)`, ephemeral: true});
        }
    },
    {
        data: {
            name: "verifwronggrey"
        },
        async execute(interaction) {
            interaction.reply({content: `лол. Ну хорошо, можешь нажимать. Мне вообще ||похуй||`, ephemeral: true});
        }
    },
    ]
