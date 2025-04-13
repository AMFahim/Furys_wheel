import { getUserFromToken } from "@/lib/JwtUser";
import { roleGuard } from "@/lib/roleGuard";
import { WheelSchema } from "@/lib/validations/wheel";
import { PrismaClient, userStatus } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const user =await roleGuard(userStatus.ADMIN);

    // console.log(user)
    if(user instanceof NextResponse){
      return user
    }
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
    const data = await prisma.wheel.findMany({
      include: {
        wheelOption: true,
      },
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
