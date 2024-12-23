/*
You will need to run "node src/register-commands.js" in order to update command list on the bot.



*/
require("dotenv").config();
const{ REST, Routes} = require("discord.js");

const commands = [
    {
        name: "meow",
        description: "Replies with MEOWWWWW!!!",
    },
    {
        name: "catpic",
        description: "Sends a random cat picture.",
    },
    {
        name: "catvid",
        description: "Sends a random cat video.",
    },
];

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Slash commands were registered successfully!");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();