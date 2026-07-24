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

async function handleDatabaseOperations() {
    let conn;
    try {
        // Grab a connection from the pool
        conn = await pool.getConnection();

        // Execute queries using standard SQL placeholders (?)
        // const rows = await conn.query("SELECT * FROM users WHERE age > ?", [18]);
        // console.log(rows);

        // Insert data (Returns metadata like insertId)
        // const res = await conn.query("INSERT INTO users (name, age) VALUES (?, ?)", ["Alex", 25]);
        // console.log(`Inserted row with ID: ${res.insertId}`);

    } catch (err) {
        console.error(err);
    } finally {
        // Releases the connection back to the pool, does not close it permanently
        if (conn) await conn.release();
    }
}
