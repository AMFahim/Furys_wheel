import { roleGuard } from "@/lib/roleGuard";
import { handleAxiosError } from "@/utils/errorHandler";
import { PrismaClient, userStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,

  { params }: { params: { id: string } }
) {
  try {
    const user = await roleGuard(userStatus.ADMIN);
    if (user instanceof NextResponse) {
      return user;
    }
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "Id not found" }, { status: 404 });
    }
    const data = await prisma.wheel.findUnique({
      where: {
        id,
      },
      include: {
        wheelOption: true,
      },
    });
    return NextResponse.json({ data, message: "Wheel fetched successfully", status: true });
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
