const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_project_db', 'root', 'root_secure_password_here', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',

    logging: console.log, // можно поставить false
});

module.exports = sequelize;