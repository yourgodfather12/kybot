const { Permissions, ChannelType } = require('discord.js');

async function createRoles(guild) {
    const roles = [
        { name: 'Admin', permissions: [Permissions.FLAGS.ADMINISTRATOR] },
        { name: 'Moderator', permissions: [Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS] },
        { name: 'Member', permissions: [] },
    ];

    for (const role of roles) {
        await guild.roles.create({
            name: role.name,
            permissions: role.permissions,
        });
    }
}

async function createChannels(guild) {
    const categories = ['General', 'Rules', 'Announcements'];

    for (const category of categories) {
        const cat = await guild.channels.create({
            name: category,
            type: ChannelType.GuildCategory,
        });
        await guild.channels.create({
            name: 'general',
            type: ChannelType.GuildText,
            parent: cat.id
        });
    }
}

async function setPermissions(guild) {
    const channel = guild.channels.cache.find(ch => ch.name === 'general');
    const role = guild.roles.cache.find(role => role.name === 'Member');

    if (channel && role) {
        await channel.permissionOverwrites.create(role, { SEND_MESSAGES: true });
    }
}

async function fetchAllMessages(channel) {
    let allMessages = [];
    let lastMessageId = null;

    try {
        while (true) {
            const options = { limit: 100 };
            if (lastMessageId) {
                options.before = lastMessageId;
            }

            const messages = await channel.messages.fetch(options);
            if (messages.size === 0) {
                break;
            }

            allMessages = allMessages.concat(Array.from(messages.values()));
            lastMessageId = messages.last().id;
        }
    } catch (error) {
        console.error(`Failed to fetch messages: ${error}`);
    }

    return allMessages;
}

async function fetchPosts(guild) {
    const allMessages = [];
    for (const channel of guild.channels.cache.values()) {
        if (channel.isText()) {
            const messages = await fetchAllMessages(channel);
            allMessages.push(...messages);
            console.log(`Fetched ${messages.length} messages from ${channel.name}`);
        }
    }
    return allMessages;
}

async function addRule(number, text) {
    console.log(`Rule ${number} added: ${text}`);
}

async function deleteRule(number) {
    console.log(`Rule ${number} deleted`);
}

async function getRules() {
    return ['Rule 1: Be kind', 'Rule 2: No spamming'];
}

module.exports = {
    createRoles,
    createChannels,
    setPermissions,
    fetchPosts,
    addRule,
    deleteRule,
    getRules,
};
