const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Create a connection to the database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10 // Optional: limit the number of connections
});

const promisePool = pool.promise(); // Enable Promise API for the pool

// Export the pool and promisePool
module.exports = {
    pool,
    promisePool
};
