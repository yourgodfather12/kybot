const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashData(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

function storeFile(storagePath, message, data) {
    const dirPath = path.join(storagePath, message.guild.name, message.channel.name, message.content);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${Date.now()}.png`);
    fs.writeFileSync(filePath, data);

    return filePath;
}

module.exports = { hashData, storeFile };
