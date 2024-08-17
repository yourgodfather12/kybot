const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'expose',
    description: 'Expose user details.',
    async execute(message, args) {
        try {
            const user = message.mentions.users.first();
            if (user) {
                log(`User details exposed by ${message.author.tag} for ${user.tag}.`);
                message.reply(`User: ${user.username}\nID: ${user.id}\nCreated: ${user.createdAt}`);
            } else {
                log(`User ${message.author.tag} failed to specify a user to expose.`);
                message.reply('Please mention a user to expose.');
            }
        } catch (error) {
            console.error(error);
            logError(`Error during user exposure: ${error.message}`);
            message.reply('There was an error exposing the user details.');
        }
    },
};
