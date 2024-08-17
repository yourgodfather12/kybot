const { fetchPosts } = require('../utils/discord_stuff');
const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'fetch',
    description: 'Fetch all posts from the server.',
    async execute(message, args) {
        try {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                log(`User ${message.author.tag} attempted to fetch posts without admin permissions.`);
                return message.reply('You do not have permission to use this command.');
            }

            await fetchPosts(message.guild);
            log(`Posts fetched successfully by ${message.author.tag}.`);
            message.reply('Posts fetched successfully.');
        } catch (error) {
            console.error(error);
            logError(`Error during post fetching: ${error.message}`);
            message.reply('There was an error fetching the posts.');
        }
    },
};
