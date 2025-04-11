import { NextResponse } from "next/server";
import { getDiscordTokens, getDiscordUser } from "@/lib/discord";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import {
  discordUsernameSchema,
  usernameValidation,
} from "@/lib/validations/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect("/login?error=no_code");
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

        // If user exists and has same Discord ID, redirect to login
        if (existingUser?.discordId === discordUser.id) {
          // Optional: Update user info if needed
          await tx.user.update({
            where: { id: existingUser!.id },
            data: {
              discordUsername: `${discordUser.username}#${discordUser.discriminator}`,
              discordAvatar: discordUser.avatar
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                : null,
            },
          });
          return existingUser;
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

      // 6. Set any necessary cookies or session data here
      const response = NextResponse.redirect(
        "/login?message=discord_auth_successful"
      );

      // Set secure HTTP-only cookie with user session data
      response.cookies.set({
        name: "session",
        value: user?.id ?? '',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // Set a separate cookie for client-side user info
      response.cookies.set({
        name: "user_info",
        value: JSON.stringify({
          username: user?.username,
          avatar: user?.discordAvatar,
        }),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // 7. Redirect to success page
      return response;
    } catch (error) {
      console.error("User creation/update error:", error);
      return NextResponse.redirect("/login?error=registration_failed");
    }
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect("/login?error=oauth_error");
  } finally {
    await prisma.$disconnect();
  }
}
