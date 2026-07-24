const mariadb = require('mariadb');

// Create a reusable pool configuration
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'db_user',
    password: 'user_secure_password_here',
    database: 'my_project_db',
    connectionLimit: 5 // Maximum number of parallel connections
});

module.exports = pool;
