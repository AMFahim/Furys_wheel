import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  return createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Authentication API Documentation',
        version: '1.0.0',
        description: 'Documentation for authentication endpoints including Discord OAuth',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
      ],
      components: {
        schemas: {
          RegisterInput: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
                minLength: 3,
                maxLength: 20,
                pattern: '^[a-zA-Z0-9_]+$',
                example: 'testuser123',
                description: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores. Cannot start with "discord_"'
              },
              password: {
                type: 'string',
                minLength: 8,
                maxLength: 100,
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$',
                example: 'TestPass123!',
                description: 'Password must be 8-100 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
              },
              discordId: {
                type: 'string',
                optional: true,
              },
              discordUsername: {
                type: 'string',
                optional: true,
              },
              discordAvatar: {
                type: 'string',
                format: 'uri',
                optional: true,
              },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: { 
                type: 'string',
                example: 'clh12345678901234567890'
              },
              username: { 
                type: 'string',
                example: 'testuser123'
              },
              discordUsername: { 
                type: 'string',
                nullable: true,
                example: null
              },
              discordAvatar: { 
                type: 'string',
                nullable: true,
                example: null
              },
              createdAt: { 
                type: 'string',
                format: 'date-time',
                example: '2023-10-24T12:34:56.789Z'
              }
            }
          },
        },
      },
    },
    apiFolder: 'app/api',
  });
};
