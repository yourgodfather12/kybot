const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Post = sequelize.define('Post', {
    id: { type: DataTypes.BIGINT, primaryKey: true },
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

sequelize.sync();

module.exports = { Post, sequelize };
