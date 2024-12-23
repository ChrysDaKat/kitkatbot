require("dotenv").config();

const time = new Date();  // Variable for time
const formattedTime = time.toLocaleTimeString('en-US', { hour12: false }); //Formats so it shows as 24hr format

const { Client, IntentsBitField, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const fs = require('node:fs');




function catAttatchment( commandName, fileExtensions ) {
        // Call for where the images are on your computer
    const imageFolder = 'G:/catPicturesandVideos'; 

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === commandName) {
            await interaction.deferReply(); // Show "thinking" while fetching the image

            try {
                // 1. Read file names
                const imageFiles = fs.readdirSync(imageFolder).filter(file => fileExtensions.includes(file.toLowerCase().split(".").pop()));

                if (imageFiles.length === 0) {
                    throw new Error('No image files found in the folder.'); 
                }

                // 2. Choose a random file
                const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

                // 3. Construct the file path
                const imagePath = `${imageFolder}/${randomImage}`;

                // 4. Create the attatchment with the local file
                const attatchment = new AttachmentBuilder(imagePath)

                // 5. Send the attatchment with the file
                interaction.editReply({files: [attatchment] });

            } catch (error) {
                console.error('Error creating attatchment:', error);
                interaction.editReply({ content: 'Oops! I couldn\'t create the attachment.' });
            }

            console.log("The [" + interaction.commandName + "] command was issued.");
        }

    });
    }

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Logs in the colsole that the bot is online
client.on("ready", (c) => {
    console.log(`${c.user.tag} is online.`);
});

// Logs messages so it is easy to know when and who messaged.
client.on("messageCreate", (message) => {
    console.log(formattedTime, message.author.globalName + "(" + message.author.username + "):", message.content);
})

// Replies meow when someone sends meow in the chat
client.on("messageCreate", (message) => {
    

    if (message.author.bot) {  // Checks to make sure message isnt coming from a bot.
        return;
    }


    if (message.content.toLowerCase().includes("meow")) {
        message.reply("Meow!");
    }
})

// /meow command
client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "meow") {
        interaction.reply("MEOWWWWW!!!");
        console.log("The [" + interaction.commandName + "] command was issued.");
    }

})


catAttatchment("catpic", ["png", "jpg", "jpeg", "gif", "webp"]);
catAttatchment("catvid", ["mp4"]);







/*
// Call for where the images are on your computer
const imageFolder = 'G:/catPicturesandVideos'; 

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "catpic") {
        await interaction.deferReply(); // Show "thinking" while fetching the image

        try {
            // 1. Read image file names
            const imageFiles = fs.readdirSync(imageFolder).filter(file => 
                file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')
            );

            if (imageFiles.length === 0) {
                throw new Error('No image files found in the folder.'); 
            }

            // 2. Choose a random image
            const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

            // 3. Construct the image path
            const imagePath = `${imageFolder}/${randomImage}`;

            // 4. Create the embed with the local image
            const embed = new EmbedBuilder()
                .setTitle("Here is a cat picture:")
                .setColor("Random")
                .setImage(`attachment://${randomImage}`); // Important: use 'attachment://'

            // 5. Send the embed with the image file
            interaction.editReply({ embeds: [embed], files: [imagePath] });

        } catch (error) {
            console.error('Error creating embed:', error);
            interaction.editReply({ content: 'Oops! I couldn\'t create the embed.' });
        }

        console.log("The [" + interaction.commandName + "] command was issued.");
    }

});
*/








// Calls for the Token in .env so its not exposed here
client.login(process.env.TOKEN);
