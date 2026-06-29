const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log("========== POSTGRES CONFIG ==========");
console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});
console.log("=====================================");


pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL connected successfully");
        client.release();
    })
    .catch(err => {
        console.log("❌ DATABASE FAILED");
        console.log(err.message);
    });


module.exports = pool;