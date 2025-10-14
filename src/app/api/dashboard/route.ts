import { postgresConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
import Pool from "@/utils/postgresql";

async function ensureTableExists() {
  await Pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs`);
  await Pool.query(`
  CREATE TABLE IF NOT EXISTS fullstacknextjs."feedback" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    comment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`);
}

// const schema = z.object({
//   name: z.string().min(2, "Name is too short"),
//   email: z.string().email("Invalid email address"),
//   comment: z
//     .string()
//     .min(5, "Comment is too short")
//     .max(255, "Comment is too long"),
// });
//Post feedback
export async function POST(req: NextRequest) {
  try {
    await postgresConnect();
    await ensureTableExists();
    const { name, email, comment } = await req.json(); // because this is a form POST

    // const result = await schema.safeParse({ name, email, comment });

    // if (!result.success) {
    //   let error: any[] = [];
    //   let message = "Something went wrong";
    //   if (result?.error instanceof z.ZodError) {
    //     error = result.error.issues.map((err) => ({
    //       [err.path.join(".")]: err.message, // e.g., "user.email"
    //     }));
    //     message = "Validation fails";
    //   }
    //   return NextResponse.json(
    //     {
    //       error,
    //       message,
    //     },
    //     { status: 403 }
    //   );
    // }

    // await Pool.query(
    //   `INSERT INTO fullstacknextjs."feedback" (name, email, comment, created_at) VALUES ($1, $2, $3, $4)`,
    //   [result.data.name, result.data.email, result.data.comment, new Date()]
    // );

    await Pool.query(
      `INSERT INTO fullstacknextjs."feedback" (name, email, comment, created_at) VALUES ($1, $2, $3, $4)`,
      [name, email, comment, new Date()]
    );

    return NextResponse.json({
      status: 201,
      //   data: existingData.rows,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: JSON.stringify(error),
        message: (error as Error).message ?? "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await postgresConnect();
    await ensureTableExists();
    const existingData = await Pool.query(
      `SELECT id,name,email,comment FROM fullstacknextjs."feedback"`
    );
    if (existingData?.rows?.length > 0) {
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
  } catch (err) {
    return NextResponse.json(
      {
        data: JSON.stringify(err),
        message: (err as Error).message ?? "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await postgresConnect();
    await ensureTableExists();
    const { id: feedbackId, name, email, comment } = await req.json(); // because this is a form POST

    // const result = await schema.safeParse({ feedbackId, name, email, comment });

    // if (!result.success) {
    //   let error: any[] = [];
    //   let message = "Something went wrong";
    //   if (result?.error instanceof z.ZodError) {
    //     error = result.error.issues.map((err) => ({
    //       [err.path.join(".")]: err.message, // e.g., "user.email"
    //     }));
    //     message = "Validation fails";
    //   }
    //   return NextResponse.json(
    //     {
    //       error,
    //       message,
    //     },
    //     { status: 403 }
    //   );
    // }

    // 1. Check if the row exists
    const existingData = await Pool.query(
      `SELECT id FROM fullstacknextjs."feedback" WHERE id = $1`,
      [feedbackId]
    );
    if (existingData.rowCount === 0) {
      return NextResponse.json({
        status: 400,
        message: "Data not found",
      });
    }

    await Pool.query(
      `UPDATE fullstacknextjs."feedback"
   SET name = $1, email = $2, comment = $3
   WHERE id = $4`,
      [name, email, comment, feedbackId]
    );

    return NextResponse.json({
      status: 201,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: `${req.json()}`,
        message: (error as Error).message ?? "Something went wrong",
      },
      { status: 500 }
    );
  }
}
