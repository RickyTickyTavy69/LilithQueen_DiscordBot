//just functions without commands, which are executed by pressing a button

import EmbedService from "../events/Embed.service.js";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";

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
    }
    ]
