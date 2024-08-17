const { log } = require('../utils/tprint');

module.exports = {
    name: 'posting',
    description: 'Manage posts within the server.',
    async execute(message, args) {
        log(`Post management command invoked by ${message.author.tag}.`);
        message.reply('Post management is under development.');
    },
};
