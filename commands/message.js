const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'message',
    description: 'Send a message to a user or channel.',
    async execute(message, args) {
        try {
            // Extract the target user or channel from mentions
            const targetUser = message.mentions.users.first();
            const targetChannel = message.mentions.channels.first();
            const msgContent = args.slice(1).join(' ');

            // Ensure a target is specified
            if (!targetUser && !targetChannel) {
                log(`User ${message.author.tag} failed to specify a target for message.`);
                return message.reply('Please mention a user or channel.');
            }

            // Ensure message content is provided
            if (!msgContent) {
                log(`User ${message.author.tag} attempted to send an empty message.`);
                return message.reply('Please provide a message to send.');
            }

            // Send the message to the appropriate target
            if (targetUser) {
                await targetUser.send(msgContent);
                log(`Message sent by ${message.author.tag} to user ${targetUser.tag}.`);
                message.reply(`Message sent successfully to ${targetUser.tag}.`);
            } else if (targetChannel) {
                await targetChannel.send(msgContent);
                log(`Message sent by ${message.author.tag} to channel #${targetChannel.name}.`);
                message.reply(`Message sent successfully to #${targetChannel.name}.`);
            }
        } catch (error) {
            console.error(error);
            logError(`Error during message sending: ${error.message}`);
            message.reply('I was unable to send the message. Please try again later.');
        }
    },
};
