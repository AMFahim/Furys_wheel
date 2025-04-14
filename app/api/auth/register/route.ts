import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided username and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration successful"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       message:
 *                         type: string
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *       409:
 *         description: Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username already taken"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { message: "Request body is empty", errors: [{ path: ["body"], message: "Required" }] },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid JSON", errors: [{ path: ["body"], message: "Invalid JSON format" }] },
        { status: 400 }
      );
    }

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const { username, password } = result.data;
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        authType: "local",
      },
      select: {
        id: true,
        username: true,
        role: true,
        discordUsername: true,
        discordAvatar: true,
      },
    });

    const token = createToken({
      userId: user.id,
      username: user.username,
      role: user.role,
      discordUsername: user.discordUsername,
      discordAvatar: user.discordAvatar,
    });

    return NextResponse.json({
      message: "Registration successful",
      token,
      user,
    }, { status: 201 });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
