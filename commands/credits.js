const { log } = require('../utils/tprint');

module.exports = {
    name: 'credits',
    description: 'Manage user credits.',
    async execute(message, args) {
        log(`Credit management command invoked by ${message.author.tag}.`);
        message.reply('Credit management is under development.');
    },
};
