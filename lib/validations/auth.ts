import * as z from "zod"

// Shared username validation rules
const usernameValidation = {
  min: 3,
  max: 20,
  pattern: /^[a-zA-Z0-9_]+$/,
  discordPrefix: 'discord_'
}

export const registerSchema = z.object({
  username: z
    .string()
    .min(usernameValidation.min, `Username must be at least ${usernameValidation.min} characters`)
    .max(usernameValidation.max, `Username must be less than ${usernameValidation.max} characters`)
    .regex(usernameValidation.pattern, "Username can only contain letters, numbers and underscores")
    .refine((username) => !username.startsWith(usernameValidation.discordPrefix), {
      message: `Username cannot start with '${usernameValidation.discordPrefix}' as it's reserved for Discord users`
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
})

export const discordUsernameSchema = z.string()
  .regex(/^discord_\d+$/, "Invalid Discord username format")

export { usernameValidation }
