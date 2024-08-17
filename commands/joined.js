const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'joined',
    description: 'Check when a user joined Discord.',
    async execute(message, args) {
        try {
            const user = message.mentions.users.first();
            if (user) {
                log(`${message.author.tag} checked join date of ${user.tag}.`);
                message.reply(`${user.username} joined Discord on ${user.createdAt}`);
            } else {
                log(`User ${message.author.tag} failed to specify a user for join date check.`);
                message.reply('Please mention a user.');
            }
        } catch (error) {
            console.error(error);
            logError(`Error checking join date: ${error.message}`);
            message.reply('There was an error checking the join date.');
        }
    },
};
