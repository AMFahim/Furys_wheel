export const DISCORD_ENDPOINTS = {
  AUTH: "https://discord.com/api/oauth2/authorize",
  TOKEN: "https://discord.com/api/oauth2/token",
  USER: "https://discord.com/api/users/@me",
} as const;

export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    response_type: "code",
    scope: "identify",
  });

  return `${DISCORD_ENDPOINTS.AUTH}?${params.toString()}`;
};

export const getDiscordTokens = async (code: string) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    grant_type: "authorization_code",
    code,
  });

  const response = await fetch(DISCORD_ENDPOINTS.TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error("Failed to get Discord tokens");
  }

  return response.json();
};

export const getDiscordUser = async (accessToken: string) => {
  const response = await fetch(DISCORD_ENDPOINTS.USER, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get Discord user");
  }

  return response.json();
};