import { NextResponse } from "next/server";
import { getUserFromToken } from "./JwtUser";

export const roleGuard = async (role: string) => {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.role !== role) {
    return NextResponse.json({ message: "You are not authorized to perform this action" }, { status: 401 });
  }

  console.log(user)

  return user;
};
