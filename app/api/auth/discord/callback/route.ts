import { NextResponse } from "next/server";
import { getDiscordTokens, getDiscordUser } from "@/lib/discord";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { discordUsernameSchema, usernameValidation } from "@/lib/validations/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect("/login?error=no_code");
    }

    const tokens = await getDiscordTokens(code);
    const discordUser = await getDiscordUser(tokens.access_token);

    // Generate Discord-specific username
    const baseUsername = `${usernameValidation.discordPrefix}${discordUser.id}`;
    
    try {
      // Validate the generated username
      discordUsernameSchema.parse(baseUsername);

      // Create new user with transaction to handle race conditions
      const newUser = await prisma.$transaction(async (tx) => {
        // Check for existing user by Discord ID first
        const existingUser = await tx.user.findFirst({
          where: {
            OR: [
              { discordId: discordUser.id },
              { username: baseUsername }
            ],
          },
        });

        if (existingUser) {
          if (existingUser.discordId === discordUser.id) {
            return NextResponse.redirect("/login?error=already_registered");
          }
          throw new Error("Username conflict");
        }

        // Generate random password for Discord users
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

      return NextResponse.redirect("/login?message=registration_successful");
    } catch (error) {
      console.error("User creation error:", error);
      return NextResponse.redirect("/login?error=registration_failed");
    }
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect("/login?error=oauth_error");
  } finally {
    await prisma.$disconnect();
  }
}
