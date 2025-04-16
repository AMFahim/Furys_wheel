import { verifyToken } from "@/lib/auth";
import { WheelSchema } from "@/lib/validations/wheel";
import { PrismaClient, userStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

async function validateAdmin(request: NextRequest) {
  // const authHeader = request.headers.get("authorization");
  // const token = authHeader?.split(" ")[1];
  const token = request.cookies.get("token")?.value;


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
    const user = await validateAdmin(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const body = await request.json();
    const result = WheelSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const { wheelOption, ...rest } = result.data;
    const data = await prisma.wheel.create({
      data: {
        ...rest,
        wheelOption: {
          create: wheelOption,
        },
      },
      include: {
        wheelOption: true,
      },
    });

    return NextResponse.json(
      { data, message: "Wheel created successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      { status: error instanceof AxiosError ? error.response?.status || 500 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await validateAdmin(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const data = await prisma.wheel.findMany({
      include: {
        wheelOption: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      { status: error instanceof AxiosError ? error.response?.status || 500 : 500 }
    );
  }
}
