const { addRule, deleteRule, getRules } = require('../utils/discord_stuff');
const { log, logError } = require('../utils/tprint');

module.exports = {
    name: 'rules',
    description: 'Manage server rules.',
    async execute(message, args) {
        try {
            const action = args[0];
            const ruleNumber = parseInt(args[1], 10);
            const ruleText = args.slice(2).join(' ');

            if (action === 'add') {
                await addRule(ruleNumber, ruleText);
                log(`Rule ${ruleNumber} added by ${message.author.tag}.`);
                message.reply(`Rule ${ruleNumber} added.`);
            } else if (action === 'delete') {
                await deleteRule(ruleNumber);
                log(`Rule ${ruleNumber} deleted by ${message.author.tag}.`);
                message.reply(`Rule ${ruleNumber} deleted.`);
            } else {
                const rules = await getRules();
                log(`Rules fetched by ${message.author.tag}.`);
                message.reply(rules.join('\n'));
            }
        } catch (error) {
            console.error(error);
            logError(`Error managing rules: ${error.message}`);
            message.reply('There was an error managing the rules.');
        }
    },
};
