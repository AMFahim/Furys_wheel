import { userStatus } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
  [x: string]: any;
  userId: string;
  role: userStatus;
}

export const getUserFromToken = async (): Promise<JwtPayload | null> => {
  try {
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // console.log(decoded);
    return decoded;
  } catch (err) {
    return null;
  }
};
