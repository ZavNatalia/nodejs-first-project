const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        imageUrl: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'products',
        timestamps: false,
    }
);

module.exports = Product;