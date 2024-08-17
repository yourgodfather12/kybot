require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Load environment variables
const token = process.env.DISCORD_TOKEN;
const adminId = process.env.ADMIN_ID;
const btcWalletId = process.env.BTC_WALLET_ID || null;

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

// Command Collection
client.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event Handlers
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.commands.get('background').execute(client); // Start background tasks
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        if (command.name === 'donate' && !btcWalletId) {
            return message.reply('BTC Wallet ID is not configured. Please contact the admin.');
        }

        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error executing that command.');
    }
});

// Log in to Discord
client.login(token);
