-# Fury's Wheel - Spin & Win

A Next.js application featuring a spinning wheel game with user authentication and API documentation.

## 🚀 Features

- Interactive spinning wheel game
- User authentication (Local & Discord)
- Swagger API documentation
- Responsive design
- Dark mode support
- PostgreSQL database integration
- Prisma ORM

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Custom + Discord OAuth
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API Documentation:** Swagger UI
- **Animation:** Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/furys-wheel.git
cd furys-wheel
```

2. Install dependencies:
```bash
yarn install
```

3. Copy the environment variables:
```bash
cp .env.example .env
```

4. Set up your environment variables in `.env`

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
yarn dev
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values. See `.env.example` for required variables.

## 📚 API Documentation

Access the API documentation at `/api-docs` when running the development server.

## 🗄️ Database Schema

The main database schema includes:
- Users (authentication, profiles)
- Game history
- Prizes configuration

See `prisma/schema.prisma` for complete schema details.

## 🔒 Authentication

The application supports:
- Local authentication (username/password)
- Discord OAuth integration

## 🎮 Game Logic

The wheel spinning mechanism uses:
- Custom React hooks for state management
- Framer Motion for animations
- Server-side validation for results

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop
- Tablet
- Mobile devices

## 🧪 Development

```bash
# Run development server
yarn dev

# Run type checking
yarn type-check

# Run linting
yarn lint

# Build for production
yarn build

# Start production server
yarn start
```

## 🚀 Deployment

The application can be deployed to:
- Vercel (recommended)
- Any Node.js hosting platform

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Please use the GitHub Issues tab to report bugs.


