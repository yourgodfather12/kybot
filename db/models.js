const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./dbInit').sequelize;

const Member = sequelize.define('Member', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    guild_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    credit: DataTypes.DECIMAL,
    email: DataTypes.STRING,
    kicks: DataTypes.INTEGER,
    bans: DataTypes.INTEGER
}, { timestamps: true });

const Rule = sequelize.define('Rule', {
    number: { type: DataTypes.INTEGER, primaryKey: true },
    rule: DataTypes.STRING
}, { timestamps: true });

module.exports = { Member, Rule };
