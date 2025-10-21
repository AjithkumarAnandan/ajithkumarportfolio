import pool from "./postgresql";


export async function ensureFeedbackTableExists() {
 await pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await pool.query(`
  CREATE TABLE IF NOT EXISTS fullstacknextjs."feedback" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    comment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`);
}

export async function ensureServersideTableExists() {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."serverside" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT null,
  created_at TIMESTAMP DEFAULT NOW()
 )
  `);
}