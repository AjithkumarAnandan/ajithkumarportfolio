// pages/api/debug-connection.js
import { Client } from "pg";

export default async function handler(req, res) {
  console.log("🔍 DEBUG: Testing database connection...");

  const connectionConfig = {
    host: "postgres",
    port: 5432,
    database: "fullstacknextjs",
    user: "postgres",
    password: "xxxxx",
    connectionTimeoutMillis: 10000,
  };

  console.log("Connection config:", connectionConfig);

  const client = new Client(connectionConfig);

  try {
    console.log("🔄 Attempting to connect...");
    await client.connect();
    console.log("✅ SUCCESS: Connected to PostgreSQL!");

    const version = await client.query("SELECT version()");
    const databases = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false"
    );
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    await client.end();

    res.status(200).json({
      status: "success",
      message: "Database connection successful",
      version: version.rows[0].version,
      databases: databases.rows,
      tables: tables.rows,
    });
  } catch (error) {
    console.error("❌ ERROR: Connection failed:", error.message);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
      connectionDetails: connectionConfig,
    });
  }
}
