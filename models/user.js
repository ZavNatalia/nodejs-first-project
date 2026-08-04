const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);

module.exports = User;