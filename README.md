# 🎰 Social Casino

A social casino game platform with slots, blackjack, poker, and more!

## 🚀 Features

- **User System**: Register, login, manage chips
- **Slot Machines**: Spin and win!
- **Blackjack**: Classic card game
- **Poker**: Multiplayer card game (coming soon)
- **Leaderboards**: Compete with friends
- **Social Features**: Add friends, chat (coming soon)
- **Admin Panel**: Manage users and games (coming soon)

## 🏗️ Project Structure

```
Social-Casino/
├── server/          # Node.js/Express backend
│   ├── routes/      # API routes
│   ├── database/    # Database schemas
│   ├── index.js     # Main server file
│   └── package.json # Dependencies
├── client/          # React frontend
│   ├── src/         # React components
│   └── package.json # Dependencies
└── README.md        # This file
```

## 📋 Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

### Database Setup

1. Create a PostgreSQL database: `social_casino`
2. Run the SQL schema: `psql -U postgres -d social_casino -f server/database/init.sql`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get leaderboard
- `GET /api/users/:userId` - Get user profile
- `POST /api/users/:userId/friends/:friendId` - Add friend

### Games
- `POST /api/games/slots` - Play slots
- `POST /api/games/blackjack` - Play blackjack
- `GET /api/games/history/:userId` - Get game history

## 🎮 How to Play

1. **Register** an account
2. **Start with 1000 chips**
3. **Play games** to win more chips
4. **Climb the leaderboard** against other players

## 📝 GitHub Issues

Check out the [Issues tab](https://github.com/liljew712/Social-Casino/issues) for planned features and tasks.

## 🤝 Contributing

Feel free to submit PRs and issues!

## 📄 License

MIT License - feel free to use this project!

---

**Happy gaming! 🎰**