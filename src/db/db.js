import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const dbConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306
}

export const pool = await mysql.createPool(dbConfig)