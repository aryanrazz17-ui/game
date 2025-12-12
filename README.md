# Crypto Casino Games

**Sports Betting • Scissors • Crash • Mines • Turtle • Plinko • Dice • Slot Game • Lottery • Roulette • Blackjack • Poker • Baccarat**

A modern crypto-powered gaming platform supporting multi-chain tokens and exciting on-chain games. This platform provides a comprehensive gaming experience with real-time multiplayer gameplay, secure wallet integration, and instant cryptocurrency payouts.

![Platform Preview](https://github.com/user-attachments/assets/a770c0e9-b45b-49f2-90a7-c215562f0b58)

---

## Games Included

| Game | Description | Preview |
|------|-------------|---------|
| **Scissors** | Classic multiplayer hand game with real-time betting and instant payouts | ![Scissors](https://github.com/user-attachments/assets/f75023fb-3788-40a6-ac73-adfa97c70a42) |
| **Crash** | Bet before the graph crashes! High-risk, high-reward game with multiplier mechanics | ![Crash](https://github.com/user-attachments/assets/aad8c424-e791-4326-97c0-38606ae89bc0) |
| **Mines** | Find safe spots, avoid bombs! Strategic game of chance with progressive difficulty | ![Mines](https://github.com/user-attachments/assets/5890bc2d-23ac-4c3c-b402-19759c577507) |
| **Turtle Race** | Race to win in a thrilling format with multiple participants and dynamic odds | ![Turtle](https://github.com/user-attachments/assets/5cd8b3c1-0f53-48c6-b660-0aba7836dc2f) |
| **Dice** | Traditional luck-based dice game with customizable odds and instant results | ![Dice](https://github.com/user-attachments/assets/b331fe0d-871a-4f4e-aea4-bf4a4cf6e74c) |
| **Slot** | Spin the reels, win rewards! Classic slot machine experience with crypto rewards | ![Slot](https://github.com/user-attachments/assets/b46a5c71-22cd-4ce7-b549-5fb451c31b87) |
| **Lottery** | Draw-based lottery system with multiple prize tiers and crypto payouts | ![Lottery](https://via.placeholder.com/400x300?text=Lottery+Game) |
| **Roulette** | Classic European roulette with crypto betting and real-time wheel spinning | ![Roulette](https://via.placeholder.com/400x300?text=Roulette+Game) |
| **Blackjack** | Traditional card game with crypto stakes and multiple betting options | ![Blackjack](https://via.placeholder.com/400x300?text=Blackjack+Game) |
| **Poker** | Multi-variant poker games with crypto buy-ins and tournament support | ![Poker](https://via.placeholder.com/400x300?text=Poker+Game) |
| **Baccarat** | Elegant card game with crypto betting and multiple side bet options | ![Baccarat](https://via.placeholder.com/400x300?text=Baccarat+Game) |

---

## Supported Cryptocurrencies

The platform supports multiple cryptocurrencies across various blockchain networks:

* Bitcoin (BTC) - Native Bitcoin network
* Ethereum (ETH) - Ethereum mainnet and testnets
* Binance Smart Chain (BSC) - BNB and BEP-20 tokens
* Tron (TRX) - Tron network and TRC-20 tokens
* USDT - Tether on all major chains (ERC-20, TRC-20, BEP-20)
* Additional ERC-20, BEP-20, and TRC-20 tokens

---

## Project Structure

### Frontend (Port: 8800)

The frontend is a React-based single-page application that provides:

* Interactive game UI with real-time updates
* Web3 wallet integration (MetaMask, WalletConnect, Coinbase Wallet)
* User authentication (Email, Google OAuth, Web3 wallet)
* Real-time Socket.IO connections for live game updates
* User account dashboard with balance, history, and settings
* Responsive design for desktop and mobile devices
* Multi-language support (if configured)

**Key Technologies:**
* React 18.2.0
* Redux for state management
* Material-UI for components
* Web3.js and Ethers.js for blockchain interactions
* Socket.IO client for real-time communication
* Axios for API requests

### Admin Panel (Port: 9000)

Comprehensive admin dashboard for platform management:

* User management and moderation
* Game configuration and settings
* Live transaction monitoring
* Platform analytics and statistics
* Revenue tracking and reporting
* Campaign and promotion management
* System health monitoring

### Backend (Microservices Architecture)

The backend is built using a microservices architecture with separate services for each game and functionality:

| Service | Port | Description |
|--------|------|-------------|
| Main Server | 5000 | Core API server handling authentication, payments, and user management |
| Admin Service | 6100 | Admin panel backend service |
| Management Service | 4000 | Platform management and analytics service |
| Chatroom Service | 4900 | Real-time chat system for user communication |
| Scissors Game | 5200 | Scissors game service with Socket.IO |
| Mines Game | 5300 | Mines game service with Socket.IO |
| Dice Game | 5400 | Dice game service with Socket.IO |
| Slot Game | 5500 | Slot game service with Socket.IO |
| Plinko Game | 5600 | Plinko game service with Socket.IO |
| Crash Game | 5700 | Crash game service with Socket.IO |
| Turtle Race | 5100 | Turtle race game service with Socket.IO |

Each game service operates independently with its own Socket.IO server for real-time gameplay, ensuring scalability and fault tolerance.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js v16 or higher (for Backend services)
* Node.js v14 or higher (for Frontend and Admin panel)
* MongoDB instance (local or cloud-based like MongoDB Atlas)
* npm or yarn package manager
* Git for version control
* Web crypto wallet extension (MetaMask, TrustWallet, etc.) for testing

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Casino-Games
```

2. Install dependencies for each component:
```bash
# Backend
cd backend
npm install --legacy-peer-deps

# Frontend
cd ../frontend
npm install --legacy-peer-deps

# Admin Panel
cd ../admin
npm install
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the backend directory (see Configuration section)

4. Start the main server:
```bash
npm run dev
```

5. Start additional game services (in separate terminals or as background processes):
```bash
npm run admin          # Admin service (port 6100)
npm run manage         # Management service (port 4000)
npm run chatroom       # Chat service (port 4900)
npm run crash          # Crash game (port 5700)
npm run dice           # Dice game (port 5400)
npm run mines          # Mines game (port 5300)
npm run scissors       # Scissors game (port 5200)
npm run slot           # Slot game (port 5500)
npm run plinko         # Plinko game (port 5600)
npm run turtle         # Turtle race (port 5100)
```

**Note:** All services use `npx nodemon` for automatic restart on code changes during development.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file (optional, for Google OAuth):
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

4. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:8800`

### Admin Panel Setup

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the admin panel:
```bash
npm start
```

The admin panel will be available at `http://localhost:9000` (or the configured port)

---

## Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
SERVER_PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/PlayZelo?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_strong_random_secret_here
JWT_EXPIRE=1h

# Tatum API (for crypto payments)
TATUM_API_KEY_TESTNET=your_testnet_api_key
TATUM_API_KEY_MAINNET=your_mainnet_api_key

# Infura (Ethereum provider)
INFURA_URL_TESTNET=https://sepolia.infura.io/v3/your_infura_key
INFURA_URL_MAINNET=https://mainnet.infura.io/v3/your_infura_key

# Network Configuration
NETWORK=mainnet
DEV_MODE=false

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Frontend Configuration

The frontend configuration is located in `frontend/src/config/baseConfig.js`. 

To switch between local and production environments, modify the `isLocal` variable:

```javascript
const isLocal = true;  // Set to false for production
```

For local development, the frontend will connect to:
* API: `http://localhost:5000/api`
* Socket Server: `http://localhost:4000`
* Chat Socket: `http://localhost:4900`

### Admin Configuration

Create a `.env` file in the `admin` directory:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_this_password
ADMIN_AUTH_KEY=your_auth_key
JWT_SECRET=your_jwt_secret
```

---

## Security Features

The platform implements multiple security measures:

* **JWT-based Authentication**: Secure token-based authentication for all API requests
* **Two-Factor Authentication (2FA)**: Optional 2FA using TOTP for enhanced account security
* **Secure Wallet Integration**: Web3 wallet connections with signature verification
* **CORS Protection**: Configurable Cross-Origin Resource Sharing policies
* **Rate Limiting**: API rate limiting to prevent abuse
* **Input Validation**: Server-side validation for all user inputs
* **Secure Password Hashing**: Bcrypt for password storage
* **Environment Variables**: Sensitive data stored in environment variables, not in code

**Important Security Note:** Never commit `.env` files to version control. Always use `.env.example` files as templates.

---

## Tech Stack

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ODM
* **Real-Time**: Socket.IO
* **Authentication**: JWT (JSON Web Tokens)
* **Blockchain**: Web3.js, Ethers.js, TronWeb
* **Payments**: Tatum API for crypto transactions
* **Email**: SendGrid for transactional emails
* **Task Scheduling**: node-cron

### Frontend
* **Framework**: React 18.2.0
* **State Management**: Redux with Redux Thunk
* **UI Library**: Material-UI (MUI)
* **Routing**: React Router DOM
* **Web3 Integration**: @web3-react/core, Ethers.js
* **Real-Time**: Socket.IO client
* **HTTP Client**: Axios
* **Build Tool**: react-app-rewired with custom webpack config

### Database
* **Primary Database**: MongoDB
* **ODM**: Mongoose
* **Models**: User, Game, Transaction, Bet History, and more

---

## Blockchain & API Integration

### Multi-Chain Support

The platform supports multiple blockchain networks:

* **Ethereum**: Mainnet and Sepolia testnet via Infura
* **Binance Smart Chain**: Mainnet and testnet
* **Tron**: Mainnet and Shasta testnet
* **Bitcoin**: Via Tatum API

### Web3 Provider Integration

* MetaMask wallet connection
* WalletConnect for mobile wallets
* Coinbase Wallet integration
* Trust Wallet support

### Payment Processing

* **Tatum API**: Handles wallet creation, deposits, and withdrawals
* **Smart Contract Integration**: ERC-20, BEP-20, and TRC-20 token support
* **Transaction Monitoring**: Real-time transaction status updates
* **Multi-currency Support**: BTC, ETH, BNB, TRX, USDT, and more

---

## Key Features

### Gaming Features
* Real-time multiplayer gameplay with Socket.IO
* Multiple game types (Crash, Dice, Mines, Scissors, Slot, Plinko, Turtle Race, Lottery, Roulette, Blackjack, Poker, Baccarat)
* Provably fair gaming with seed-based randomness
* Instant game results and payouts
* Game history and statistics
* Sports betting with live odds and bet slip functionality

### Wallet Features
* Multi-currency wallet support
* Deposit and withdrawal functionality
* Real-time balance updates
* Transaction history
* Multi-chain token support

### User Features
* Multiple authentication methods (Email, Google OAuth, Web3 wallet)
* User profile management
* Game settings and preferences
* Betting history and statistics
* Affiliate program support
* Tournament participation

### Admin Features
* Comprehensive admin dashboard
* User management and moderation
* Game configuration
* Transaction monitoring
* Analytics and reporting
* Campaign management

### Communication Features
* Real-time chat system
* User-to-user messaging
* Chat moderation tools

---

## Development

### Running All Services

To run all backend services simultaneously, execute each service in a separate terminal or use a process manager like PM2:

```bash
# Terminal 1 - Main Server
cd backend
npm run dev

# Terminal 2 - Admin Service
npm run admin

# Terminal 3 - Management Service
npm run manage

# Terminal 4 - Chat Service
npm run chatroom

# Terminal 5-11 - Game Services
npm run crash
npm run dice
npm run mines
npm run scissors
npm run slot
npm run plinko
npm run turtle
```

### Code Structure

```
backend/
├── server.js              # Main server entry point
├── config.js              # Configuration file
├── controllers/           # Request handlers
├── models/                # Database models
├── routes/                # API routes
├── middleware/            # Express middleware
├── helper/                # Utility functions
├── crash/                 # Crash game service
├── dice/                  # Dice game service
├── mines/                 # Mines game service
├── scissors/              # Scissors game service
├── slot/                  # Slot game service
├── plinko/                # Plinko game service
├── turtlerace/            # Turtle race service
├── userchat/              # Chat service
├── management/            # Management service
└── admin/                 # Admin service

frontend/
├── src/
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   ├── config/            # Configuration files
│   ├── redux/             # Redux store and reducers
│   ├── routes/            # Route definitions
│   ├── views/              # Page components
│   ├── layout/            # Layout components
│   ├── assets/            # Static assets
│   └── themes/            # Theme configuration
└── public/                # Public assets
```

### Environment Variables

Always use environment variables for sensitive configuration. Never hardcode:
* API keys
* Database credentials
* JWT secrets
* Private keys
* Service URLs

---

## Contributing

We welcome contributions to improve the platform. To contribute:

1. Fork the repository
2. Create a feature branch from the main branch
3. Make your changes with clear commit messages
4. Test your changes thoroughly
5. Push your branch to your fork
6. Open a Pull Request with a detailed description

### Code Standards

* Follow existing code style and conventions
* Write clear, commented code
* Add tests for new features when possible
* Update documentation for significant changes
* Ensure all services start without errors

---

## Troubleshooting

### Common Issues

**Port Already in Use:**
If a port is already in use, either stop the conflicting service or change the port in the configuration file.

**MongoDB Connection Error:**
Ensure MongoDB is running and the connection string in `.env` is correct. Check network connectivity for cloud MongoDB instances.

**Module Not Found:**
Run `npm install` again in the affected directory. Use `--legacy-peer-deps` flag if you encounter peer dependency conflicts.

**Socket.IO Connection Issues:**
Verify that the Socket.IO server is running and the client is configured with the correct URL in `baseConfig.js`.

**Web3 Wallet Connection:**
Ensure you have a Web3 wallet extension installed (MetaMask, etc.) and are on a supported network.

---

## License

This project is licensed under the **ISC License**.

You are free to use, modify, and distribute this software. However, please use it responsibly and in compliance with applicable laws and regulations in your jurisdiction.

---

## Contact & Support

For questions, support, or collaboration opportunities:

* **Telegram**: [https://t.me/novustch](https://t.me/novustch)
* **Twitter/X**: [https://x.com/novustch](https://x.com/novustch)

Feel free to reach out for technical support, feature requests, or general inquiries about the platform.

---

## Acknowledgments

This platform utilizes various open-source libraries and frameworks. Special thanks to all the contributors and maintainers of the projects that make this platform possible.

---

**Note**: This is a gaming platform that involves cryptocurrency transactions. Always ensure compliance with local regulations regarding online gaming and cryptocurrency usage. Use responsibly and at your own risk.
