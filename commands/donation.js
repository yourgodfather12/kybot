const { log } = require('../utils/tprint');

module.exports = {
    name: 'donate',
    description: 'Send donation details.',
    async execute(message, args) {
        const btcWalletId = process.env.BTC_WALLET_ID || null;

        if (!btcWalletId) {
            return message.reply('BTC Wallet ID is not configured. Please contact the admin.');
        }

        const adminId = process.env.ADMIN_ID;
        const walletImage = config.btcWalletImagePath;
        const helpSites = ['site1.com', 'site2.com'];

        message.channel.send(
            `A full donation suite is coming soon! Until then, send your BTC donation to the following address: ${btcWalletId}\\n` +
            `If you need help converting to BTC, check out: ${helpSites.join(', ')}\\n` +
            `Once you send your donation, send a screenshot to <@${adminId}>.\\n` +
            `Thank you for your support!`
        );
        message.channel.send({ files: [walletImage] });

        log(`Donation command invoked by ${message.author.tag}.`);
    },
};
