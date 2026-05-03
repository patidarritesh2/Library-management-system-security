
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
  host: 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: 'root',
  password: 'root',
  database: process.env.DB_NAME || 'library_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
