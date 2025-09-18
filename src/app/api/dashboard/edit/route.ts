import { postgresConnect } from "@/utils/dbConnect";
import pool from "@/utils/postgresql";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    await postgresConnect();
    const { id, name } = await req.json();

    // Validate input
    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the dashboard exists
    const existingData = await pool.query(
      `SELECT * FROM fullstacknextjs."serverside" WHERE id = $1`,
      [id]
    );

    if (existingData.rows.length === 0) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    // Update the appropriate field
    await pool.query(
      `UPDATE fullstacknextjs."serverside" SET name = $1 WHERE id = $2`,
      [name, id]
    );

    return NextResponse.json({ message: "Dashboard updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message ?? "Server error" },
      { status: 500 }
    );
  }
};
