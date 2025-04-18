import { getUserFromToken } from "@/lib/JwtUser";
import { handleAxiosError } from "@/utils/errorHandler";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { AxiosError } from 'axios';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const user = await getUserFromToken();
        if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const data = await prisma.user.findUnique({
            where: {
                id: user.userId,
            },
            include: {
                winPrize: true,
            }
        });
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