async function createRoles(guild) {
    const roles = [
        { name: 'Admin', permissions: ['ADMINISTRATOR'] },
        { name: 'Moderator', permissions: ['KICK_MEMBERS', 'BAN_MEMBERS'] },
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
        const cat = await guild.channels.create(category, { type: 'GUILD_CATEGORY' });
        await guild.channels.create('general', { type: 'GUILD_TEXT', parent: cat });
    }
}

async function setPermissions(guild) {
    const channel = guild.channels.cache.find(ch => ch.name === 'general');
    const role = guild.roles.cache.find(role => role.name === 'Member');

    if (channel && role) {
        await channel.permissionOverwrites.create(role, { SEND_MESSAGES: true });
    }
}

async function fetchPosts(guild) {
    for (const channel of guild.channels.cache.values()) {
        if (channel.isText()) {
            const messages = await channel.messages.fetch({ limit: 100 });
            console.log(`Fetched ${messages.size} messages from ${channel.name}`);
        }
    }
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
