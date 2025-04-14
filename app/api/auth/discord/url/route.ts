import { NextResponse } from "next/server";
import { getDiscordAuthUrl } from "@/lib/discord";

export async function GET() {
  try {
    const authUrl = getDiscordAuthUrl();
    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Failed to generate Discord auth URL:", error);
    return NextResponse.json(
      { message: "Failed to generate Discord auth URL" },
      { status: 500 }
    );
  }
}