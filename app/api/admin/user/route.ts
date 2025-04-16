import { roleGuard } from "@/lib/roleGuard";
import { handleAxiosError } from "@/utils/errorHandler";
import { PrismaClient, userStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  try {
    const user = await roleGuard(userStatus.ADMIN);
    if (user instanceof NextResponse) {
      return user;
    }
    console.log(user);

    const data = await prisma.user.findMany();
    return NextResponse.json({ data, message: "Users fetched successfully", status: true });
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
