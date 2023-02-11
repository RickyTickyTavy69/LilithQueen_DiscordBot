import { REST, Routes } from 'discord.js'
import commandsArray from "./commands.js"

//dotenv
import dotenv from "dotenv";
dotenv.config();

let commands = [];
for(const command of commandsArray){
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);


(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.INSOMNIA_GUILD_ID),
            { body: commands },
        );
        const data1 = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TARTALOS_GUILD_ID),
            { body: commands },
        );

        const data3 = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_GUILD_ID),
            { body: commands },
        );

        const data5 = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.MUSIC_SERVER_GUILD_ID),
            { body: commands },
        );

        const dataGlobal = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        console.log(`Successfully reloaded ${data1.length} application (/) commands.`);
        console.log(`global commands deployed ${dataGlobal.length}`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();