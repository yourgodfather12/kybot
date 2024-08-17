const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'background',
    description: 'Perform background tasks periodically.',
    async execute(client) {
        try {
            setInterval(async () => {
                log('Performing scheduled task...');
                const guild = client.guilds.cache.first();
                const members = await guild.members.fetch();
                members.forEach(member => {
                    log(`Checking member: ${member.user.tag}`);
                    // Add additional checks or tasks here
                });
            }, 1000 * 60 * 60); // Every hour
        } catch (error) {
            console.error(error);
            logError(`Error during background task: ${error.message}`);
        }
    },
};
