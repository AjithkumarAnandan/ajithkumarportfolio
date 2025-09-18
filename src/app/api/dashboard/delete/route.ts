import pool from "@/utils/postgresql";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
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
      `DELETE FROM fullstacknextjs."serverside" WHERE id = $1 `,
      [id]
    );
    return NextResponse.json({ data: "successfully deleted", status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message ?? "Server error" },
      { status: 500 }
    );
  }
};
