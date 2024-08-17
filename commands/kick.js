const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    async execute(message, args) {
        try {
            if (!message.member.permissions.has('KICK_MEMBERS')) {
                log(`User ${message.author.tag} attempted to kick without permissions.`);
                return message.reply('You do not have permission to kick members.');
            }

            const user = message.mentions.users.first();
            if (!user) {
                log(`User ${message.author.tag} failed to specify a user to kick.`);
                return message.reply('Please mention a user to kick.');
            }

            const member = message.guild.members.resolve(user);
            if (!member) {
                log(`User ${message.author.tag} attempted to kick ${user.tag}, but they are not in the server.`);
                return message.reply('That user is not in this server.');
            }

            await member.kick('Kicked by command');
            log(`${message.author.tag} kicked ${user.tag}.`);
            message.reply(`${user.tag} has been kicked.`);
        } catch (error) {
            console.error(error);
            logError(`Error during kicking process: ${error.message}`);
            message.reply('I was unable to kick the member.');
        }
    },
};
