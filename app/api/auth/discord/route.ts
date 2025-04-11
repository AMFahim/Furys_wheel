import { NextResponse } from "next/server";
import { getDiscordAuthUrl } from "@/lib/discord";

/**
 * @swagger
 * /api/auth/discord:
 *   get:
 *     summary: Initialize Discord OAuth
 *     description: Redirects user to Discord authorization page
 *     tags:
 *       - Discord OAuth
 *     responses:
 *       302:
 *         description: Redirect to Discord authorization page
 */
export async function GET() {
  const authUrl = getDiscordAuthUrl();
  return NextResponse.redirect(authUrl);
}
