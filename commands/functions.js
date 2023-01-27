//just functions without commands, which are executed by pressing a button

import EmbedService from "../events/Embed.service.js";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import {client} from "../index.js";

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
            interaction.reply("you liked the avatar");
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
            interaction.reply("you disliked the avatar");
        }
    },
    // commands for verification buttons
    {
        data: {
            name: "verify"
        },
        async execute(interaction) {
            const member = interaction.member;
            const unverifiedRole = member.guild.roles.cache.get("1067852787846758470");
            const userRole = member.guild.roles.cache.get("1037137641587613726");
            member.roles.delete(unverifiedRole);
            member.roles.add(userRole);
            const username = interaction.user.username;
            const userId = interaction.user.id;
            interaction.reply({content: "вы успешно верифицировались. Добро пожаловать!", ephemeral: true});
        }
    },
    ]
