const { log } = require('../utils/tprint');

module.exports = {
    name: 'leaks',
    description: 'Provide leak resources.',
    async execute(message, args) {
        log(`User ${message.author.tag} invoked the leaks command.`);
        message.reply('Leaking is against Discord’s terms of service. Please refrain from sharing such content.');
    },
};
