const { log } = require('../utils/tprint');

const options = [true, false];
const multipliers = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];

module.exports = {
    name: 'bet',
    description: 'Place a bet.',
    async execute(message, args) {
        try {
            const bet = parseInt(args[0], 10);
            if (isNaN(bet)) {
                log(`Invalid bet amount entered by ${message.author.tag}.`);
                return message.reply('Please enter a valid bet amount.');
            }

            const win = options[Math.floor(Math.random() * options.length)];
            if (win) {
                const multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
                const winnings = (bet * multiplier).toFixed(2);
                log(`${message.author.tag} won ${winnings} on a bet of ${bet}.`);
                message.reply(`Congratulations! You bet ${bet} and won ${winnings}.`);
            } else {
                log(`${message.author.tag} lost a bet of ${bet}.`);
                message.reply('Sorry, you lost. Better luck next time!');
            }
        } catch (error) {
            console.error(error);
            logError(`Error during betting process: ${error.message}`);
            message.reply('There was an error processing your bet.');
        }
    },
};
