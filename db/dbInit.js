const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Use SQLite and store the database in the root directory
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.db'),
    logging: false // Disable Sequelize logging
});

const Post = sequelize.define('Post', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    guild_id: DataTypes.BIGINT,
    hash_md5: DataTypes.STRING,
    hash_perceptual: DataTypes.STRING,
    message_id: DataTypes.BIGINT,
    author_id: DataTypes.BIGINT,
    channel_id: DataTypes.BIGINT,
    attachment_url: DataTypes.STRING,
    message: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    file_path: DataTypes.STRING
}, { timestamps: true });

sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Failed to synchronize the database:', err));

module.exports = { Post, sequelize };
