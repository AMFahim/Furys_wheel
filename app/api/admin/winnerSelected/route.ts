import { verifyToken } from "@/lib/auth";
import {
  updateWinPrizeSchema,
  WinPrizeSchema,
} from "@/lib/validations/winPrize";
import { PrismaClient, userStatus, wheelStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { JwtPayload } from "jsonwebtoken";
import { getUserFromToken } from "@/lib/JwtUser";

const prisma = new PrismaClient();

async function validateAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  const user = verifyToken(token) as JwtPayload | null;
  if (!user || user.role !== userStatus.ADMIN) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  return user;
}

export async function POST(request: NextRequest) {
  try {
    const user = (await getUserFromToken()) as JwtPayload | null;
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }
    const body = await request.json();
    const result = WinPrizeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const data = await prisma.winPrize.create({
      data: {
        ...result.data,
        userId: user.userId,
      },
    });

    return NextResponse.json(
      { data, message: "WinPrize created successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      {
        status:
          error instanceof AxiosError ? error.response?.status || 500 : 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await validateAdmin(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Id not found" }, { status: 404 });
    }

    const body = await request.json();
    const parseBody = updateWinPrizeSchema.safeParse(body);

    if (!parseBody.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parseBody.error.errors },
        { status: 400 }
      );
    }

    const result = await prisma.winPrize.update({
      where: { id },
      data: {
        ...parseBody.data,
        updatedBy: user.userId, // Track who approved/updated the prize
      },
    });

    return NextResponse.json(
      { message: "WinPrize updated successfully", status: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      {
        status:
          error instanceof AxiosError ? error.response?.status || 500 : 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") as wheelStatus;

    const data = await prisma.winPrize.findMany({
      where: {
        status: status ? status : undefined,
      },
      include: {
        user: {
          select: {
            username: true,
            discordUsername: true,
          },
        },
      },
    });
    return NextResponse.json({data, message: "WinPrize fetched successfully", status: true });
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      {
        status:
          error instanceof AxiosError ? error.response?.status || 500 : 500,
      }
    );
  }
}
