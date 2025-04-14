import { NextResponse } from "next/server";
import { getDiscordTokens, getDiscordUser } from "@/lib/discord";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import {
  discordUsernameSchema,
  usernameValidation,
} from "@/lib/validations/auth";
import { createToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL('/login?error=no_code', baseUrl));
    }

    // 1. Exchange code for access token
    const tokens = await getDiscordTokens(code);

    // 2. Get user info from Discord
    const discordUser = await getDiscordUser(tokens.access_token);

    // 3. Generate username for Discord user
    const baseUsername = `${usernameValidation.discordPrefix}${discordUser.id}`;

    try {
      // 4. Validate username format
      discordUsernameSchema.parse(baseUsername);

      // 5. Handle user creation/login
      const user = await prisma.$transaction(async (tx) => {
        // Check if user exists
        const existingUser = await tx.user.findFirst({
          where: {
            OR: [{ discordId: discordUser.id }, { username: baseUsername }],
          },
        });

        // If user exists and has same Discord ID, update and return
        if (existingUser?.discordId === discordUser.id) {
          return await tx.user.update({
            where: { id: existingUser!.id },
            data: {
              discordUsername: `${discordUser.username}#${discordUser.discriminator}`,
              discordAvatar: discordUser.avatar
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                : null,
            },
          });
        }

        // If username conflict but different Discord ID, throw error
        if (existingUser) {
          throw new Error("Username conflict");
        }

        // Create new user
        const randomPassword =
          Math.random().toString(36).slice(-10) +
          Math.random().toString(36).slice(-10).toUpperCase() +
          "!1";
        const hashedPassword = await hash(randomPassword, 12);

        return await tx.user.create({
          data: {
            username: baseUsername,
            authType: "discord",
            password: hashedPassword,
            discordId: discordUser.id,
            discordUsername: `${discordUser.username}#${discordUser.discriminator}`,
            discordAvatar: discordUser.avatar
              ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
              : null,
          },
        });
      });

      const token = createToken({
        userId: user.id,
        username: user.username,
        role: user.role,
        discordUsername: user.discordUsername,
        discordAvatar: user.discordAvatar,
      });

      // Create the URL with user data
      const userData = {
        id: user.id,
        username: user.username,
        role: user.role,
        discordUsername: user.discordUsername,
        discordAvatar: user.discordAvatar,
      };

      const callbackUrl = new URL('/auth/discord/callback', baseUrl);
      callbackUrl.searchParams.set('token', token);
      callbackUrl.searchParams.set('userData', JSON.stringify(userData));

      // Create response with redirect to the client-side callback page
      const response = NextResponse.redirect(callbackUrl);
      
      // Set cookie
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;

    } catch (error) {
      console.error("User creation/update error:", error);
      return NextResponse.redirect(new URL('/login?error=registration_failed', baseUrl));
    }
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(new URL('/login?error=oauth_error', baseUrl));
  } finally {
    await prisma.$disconnect();
  }
}
