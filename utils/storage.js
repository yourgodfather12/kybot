const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashData(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

function storeFile(storagePath, message, data) {
    const safeGuildName = path.basename(message.guild.name);
    const safeChannelName = path.basename(message.channel.name);
    const safeContent = path.basename(message.content);

    const dirPath = path.join(storagePath, safeGuildName, safeChannelName, safeContent);
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filePath = path.join(dirPath, `${Date.now()}.png`);
        fs.writeFileSync(filePath, data);

        return filePath;
    } catch (error) {
        console.error(`Failed to store file: ${error}`);
        return null;
    }
}

module.exports = { hashData, storeFile };
