const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'moderation',
    description: 'Moderate the server (ban, kick, verify).',
    async execute(message, args) {
        try {
            const action = args[0];
            const user = message.mentions.users.first();

            if (!user) {
                log(`User ${message.author.tag} failed to specify a user for moderation.`);
                return message.reply('Please mention a user.');
            }

            const member = message.guild.members.resolve(user);
            if (!member) {
                log(`User ${message.author.tag} attempted to moderate ${user.tag}, but they are not in the server.`);
                return message.reply('That user is not in this server.');
            }

            if (action === 'ban') {
                if (!message.member.permissions.has('BAN_MEMBERS')) {
                    log(`User ${message.author.tag} attempted to ban without permissions.`);
                    return message.reply('You do not have permission to ban members.');
                }
                await member.ban({ reason: 'Banned by command' });
                log(`${user.tag} was banned by ${message.author.tag}.`);
                message.reply(`${user.tag} has been banned.`);
            } else if (action === 'kick') {
                if (!message.member.permissions.has('KICK_MEMBERS')) {
                    log(`User ${message.author.tag} attempted to kick without permissions.`);
                    return message.reply('You do not have permission to kick members.');
                }
                await member.kick('Kicked by command');
                log(`${user.tag} was kicked by ${message.author.tag}.`);
                message.reply(`${user.tag} has been kicked.`);
            } else if (action === 'verify') {
                // Verification logic here
                log(`${user.tag} was verified by ${message.author.tag}.`);
                message.reply(`${user.tag} has been verified.`);
            } else {
                log(`User ${message.author.tag} entered an invalid moderation action.`);
                message.reply('Invalid moderation action. Use "ban", "kick", or "verify".');
            }
        } catch (error) {
            console.error(error);
            logError(`Error during moderation process: ${error.message}`);
            message.reply('There was an error performing the moderation action.');
        }
    },
};
