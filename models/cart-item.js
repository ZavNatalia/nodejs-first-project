const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define(
    'cartItem',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: 'cartItem',
        timestamps: false,
    }
);

module.exports = CartItem;