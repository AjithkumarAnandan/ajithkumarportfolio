import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Pool from "./postgresql";
dotenv.config();
const app = express();
const port = process.env.HOST_ENV ?? "http://localhost:3000";

const postgresConnect = async () => {
  try {
    // Connect to PostgreSQL
    await Pool.connect();
    if (!Pool) {
      throw new Error(
        "❌ POSTGRES_URI is not defined in environment variables."
      );
    }
    // console.log("Environment Variables:", process.env.PG_DATABASE);
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", (error as Error).message);
    throw new Error("PostgreSQL connection failed");
  }
};

// CORS
app.use(
  cors({
    origin: port,
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
  })
);
export { postgresConnect };
