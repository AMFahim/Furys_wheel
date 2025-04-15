import jwt from 'jsonwebtoken';
import { userStatus } from '@prisma/client';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';
const TOKEN_COOKIE_NAME = 'token';

export interface JwtPayload {
  userId: string;
  username: string;
  role: userStatus;
  discordUsername?: string | null;
  discordAvatar?: string | null;
}

export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload);
    return payload;
  } catch (e) {
    return null;
  }
}


// Client-side token management using cookies
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get(TOKEN_COOKIE_NAME) || null;
};

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME, { path: '/' });
};


