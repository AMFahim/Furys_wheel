import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        discordUsername: true,
        discordAvatar: true,
      },
    });

    if (!user || !await compare(password, user.password)) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createToken({
      userId: user.id,
      username: user.username,
      role: user.role,
      discordUsername: user.discordUsername,
      discordAvatar: user.discordAvatar,
    });

    const response = NextResponse.json(
      { 
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          discordUsername: user.discordUsername,
          discordAvatar: user.discordAvatar,
        },
        token: token
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
