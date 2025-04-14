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
  try {
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
      body: params.toString(), // Make sure to convert params to string
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error('Discord API Error:', {
        status: response.status,
        statusText: response.statusText,
        error,
        clientId: process.env.DISCORD_CLIENT_ID,
        redirectUri: process.env.DISCORD_REDIRECT_URI,
      });
      throw new Error(
        `Discord token error: ${response.status} ${response.statusText}${
          error ? ` - ${JSON.stringify(error)}` : ''
        }`
      );
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token received from Discord');
    }

    return data;
  } catch (error) {
    console.error('Discord token exchange failed:', error);
    throw error; // Propagate the original error for better debugging
  }
};

export const getDiscordUser = async (accessToken: string) => {
  try {
    const response = await fetch(DISCORD_ENDPOINTS.USER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        `Discord user error: ${response.status} ${response.statusText}${
          error ? ` - ${JSON.stringify(error)}` : ''
        }`
      );
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error('Invalid user data received from Discord');
    }

    return data;
  } catch (error) {
    console.error('Discord user fetch failed:', error);
    throw new Error('Failed to fetch Discord user data');
  }
};
