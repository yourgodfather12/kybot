const { createRoles, createChannels, setPermissions } = require('../utils/discord_stuff');
const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'build',
    description: 'Build the server from scratch.',
    async execute(message, args) {
        try {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                log(`User ${message.author.tag} attempted to build server without admin permissions.`);
                return message.reply('You do not have permission to use this command.');
            }

            const state = args[0];
            if (!state) {
                log(`User ${message.author.tag} failed to specify a state for build.`);
                return message.reply('You need to provide a state.');
            }

            await removeEverything(message.guild);
            await createRoles(message.guild);
            await createChannels(message.guild);
            await setPermissions(message.guild);

            log(`Server built successfully by ${message.author.tag}.`);
            message.reply('Server built successfully.');
        } catch (error) {
            console.error(error);
            logError(`Error during server build: ${error.message}`);
            message.reply('I was unable to build the server.');
        }
    },
};

async function removeEverything(guild) {
    try {
        for (const channel of guild.channels.cache.values()) {
            await channel.delete();
        }

        for (const role of guild.roles.cache.values()) {
            if (role.name !== '@everyone') {
                await role.delete();
            }
        }
    } catch (error) {
        logError(`Error during server cleanup: ${error.message}`);
    }
}
