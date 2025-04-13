import { registerSchema } from "@/lib/validations/auth";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        username: result.data.username,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const comparePassword = await compare(result.data.password, user.password);

    if (!comparePassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
        { message: "Login successful", user },
        { status: 200 }
      );
  
      // Set the cookie
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
  
      return response;
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
