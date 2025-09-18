import { postgresConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Pool from "@/utils/postgresql";

async function ensureTableExists() {
  await Pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await Pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."serverside" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT null,
  created_at TIMESTAMP DEFAULT NOW()
 )
  `);
}

export const GET = async () => {
  try {
    await postgresConnect();
    await ensureTableExists();
    const existingData = await Pool.query(
      `SELECT * FROM fullstacknextjs."serverside"`
    );
    if (existingData.rows.length > 0) {
      return NextResponse.json({
        status: 200,
        data: existingData.rows,
        message: "Data fetched successfully",
      });
    } else {
      return NextResponse.json({
        status: 200,
        data: [],
        message: "No data found",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message ?? "Server error" },
      { status: 500 }
    );
  }
};

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
});

//Add
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

    await Pool.query(
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
