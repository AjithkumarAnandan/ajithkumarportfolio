import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // only if you face SSL errors (Neon uses SSL)
  },
  // host: process.env.PG_HOST ?? "localhost",
  // port: parseInt(process.env.PG_PORT ?? "5432", 10),
  // user: process.env.PG_USER ?? "postgres",
  // password: process.env.PG_PASSWORD ?? "password",
  // database: process.env.PG_DATABASE ?? "fullstacknextjs",
  // ssl: false,
});



export default pool;
