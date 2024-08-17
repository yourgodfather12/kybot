const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'message',
    description: 'Send a message to a user or channel.',
    async execute(message, args) {
        try {
            const target = message.mentions.users.first() || message.mentions.channels.first();
            const msgContent = args.slice(1).join(' ');

            if (!target) {
                log(`User ${message.author.tag} failed to specify a target for message.`);
                return message.reply('Please mention a user or channel.');
            }

            if (!msgContent) {
                log(`User ${message.author.tag} attempted to send an empty message.`);
                return message.reply('Please provide a message to send.');
            }

            await target.send(msgContent);
            log(`Message sent by ${message.author.tag} to ${target.tag || target.name}.`);
            message.reply('Message sent successfully.');
        } catch (error) {
            console.error(error);
            logError(`Error during message sending: ${error.message}`);
            message.reply('I was unable to send the message.');
        }
    },
};
