import db from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  try {
    const existingEmail = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingEmail.length > 0) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({
      email,
      password: hashedPassword,
      name,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Something went wrong", { status: 500 });
  }

  return new NextResponse("User created successfully");
}
