require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Load environment variables
const token = process.env.DISCORD_TOKEN;
const adminId = process.env.ADMIN_ID;
const btcWalletId = process.env.BTC_WALLET_ID || null;

// Ensure required environment variables are set
if (!token || !adminId) {
    console.error('Missing required environment variables. Please check your .env file.');
    process.exit(1); // Exit the process with an error code
}

// Create a new client instance with required intents
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'], // For handling uncached message reactions, etc.
});

// Command Collection
client.commands = new Collection();

// Load command files dynamically
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name) {
        client.commands.set(command.name, command);
    } else {
        console.warn(`Command file ${file} is missing a name property and was not loaded.`);
    }
}

// Event Handlers
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Start background tasks if the command exists
    const backgroundCommand = client.commands.get('background');
    if (backgroundCommand) {
        backgroundCommand.execute(client).catch(err => {
            console.error('Failed to start background tasks:', err);
        });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        if (command.name === 'donate' && !btcWalletId) {
            return message.reply('BTC Wallet ID is not configured. Please contact the admin.');
        }

        await command.execute(message, args);
    } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        message.reply('There was an error executing that command. Please try again later.');
    }
});

// Log in to Discord
client.login(token).catch(err => {
    console.error('Failed to login to Discord:', err);
    process.exit(1); // Exit the process with an error code
});
