import { verifyToken } from "@/lib/auth";
import { updateWheelSchema, WheelSchema } from "@/lib/validations/wheel";
import { PrismaClient, userStatus, wheelStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { JwtPayload } from "jsonwebtoken";
import { roleGuard } from "@/lib/roleGuard";

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const user = await roleGuard(userStatus.ADMIN);
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

export async function PUT(request: NextRequest) {
  try {
    const user = await roleGuard(userStatus.ADMIN);
    if (user instanceof NextResponse) return user;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Id not found" }, { status: 400 });
    }

    const body = await request.json();
    const result = updateWheelSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid input data",
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }

    const { wheelOption, ...rest } = result.data;

    if (rest.status === "APPROVED") {
      await prisma.wheel.updateMany({
        where: { id: { not: id } },
        data: {
          status: wheelStatus.PENDING,
        },
      });
    }

    const updatedWheel = await prisma.wheel.update({
      where: { id },
      data: {
        ...rest,
        wheelOption: {
          deleteMany: {}, // Deletes all existing wheelOptions
          create: wheelOption, // Recreates new ones
        },
      },
      include: {
        wheelOption: true,
      },
    });

    return NextResponse.json(
      {
        message: "Wheel updated successfully",
        data: updatedWheel,
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);

    return NextResponse.json(
      {
        message: errorDetails.message || "Internal Server Error",
        errors: errorDetails.errors,
      },
      {
        status:
          error instanceof AxiosError
            ? error.response?.status || 500
            : 500,
      }
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    const user = await roleGuard(userStatus.ADMIN);
    if (user instanceof NextResponse) {
      return user;
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as wheelStatus;
    const data = await prisma.wheel.findMany({
      where: {
        status: status ? status : undefined,
      },
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

export async function DELETE(request: NextRequest) {
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

    const data = await prisma.wheel.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Wheel deleted successfully",
      status: true,
    });
  } catch (error) {
    const errorDetails = handleAxiosError(error as AxiosError);
    return NextResponse.json(
      { message: errorDetails.message, errors: errorDetails.errors },
      { status: error instanceof AxiosError ? error.response?.status || 500 : 500 }
    );
  }
} 