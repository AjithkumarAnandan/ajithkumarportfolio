// app/api/add/route.ts
import { postgresConnect } from "@/utils/dbConnect";
import pool from "@/utils/postgresql";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Pool from "@/utils/postgresql";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
});

async function ensureTableExists() {
  await Pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await Pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."serverside" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT null,
  created_at TIMESTAMP DEFAULT NOW()
 )
  `);
}
export async function POST(req: NextRequest) {
  try {
    await postgresConnect();
    await ensureTableExists();
    const { name } = await req.json(); // because this is a form POST

    const result = schema.safeParse({ name });

    if (!result.success) {
      return NextResponse.json(
        { data: `${result}`, message: "Something went wrong" },
        { status: 500 }
      );
    }

    await pool.query(
      `INSERT INTO fullstacknextjs."serverside" (name, created_at) VALUES ($1, $2)`,
      [result.data.name, new Date()]
    );

    return NextResponse.json({
      status: 201,
      //   data: existingData.rows,
      message: "Data created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: `${req.json()}`,
        message: (error as Error).message ?? "Server error",
      },
      { status: 500 }
    );
  }
}
