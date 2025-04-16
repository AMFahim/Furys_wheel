import { handleAxiosError } from "@/utils/errorHandler";
import { PrismaClient, userStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from 'axios';

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ message: "Id not found" }, { status: 404 });
        }
        const data = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                winPrize: true
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