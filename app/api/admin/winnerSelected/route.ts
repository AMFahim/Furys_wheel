import { getUserFromToken } from "@/lib/JwtUser";
import { roleGuard } from "@/lib/roleGuard";
import {
  updateWinPrizeSchema,
  WinPrizeSchema,
} from "@/lib/validations/winPrize";
import { PrismaClient, userStatus, wheelStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const decode = await getUserFromToken();

    if (!decode) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(decode);
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
        userId: decode.id,
      },
    });
    return NextResponse.json(
      { data, message: "WinPrize created successfully", status: true },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await roleGuard(userStatus.ADMIN);

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
      data: parseBody.data,
    });

    return NextResponse.json(
      { message: "WinPrize updated successfully", status: true, data: result },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await prisma.winPrize.findMany({
      where: {
        status: wheelStatus.APPROVED,}
    });
    return NextResponse.json(data);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
