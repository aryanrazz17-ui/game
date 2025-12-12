/**
 * Game Configuration
 * Centralized configuration for all games
 */

export const GAME_CONFIG = {
  SCISSOR: {
    id: 'scissor',
    name: 'Scissors',
    path: '/app/games/scissor',
    description: 'Classic multiplayer hand game with real-time betting',
    category: 'live',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'scissorSocketUrl',
    icon: '/assets/images/games/scissor.png'
  },
  TURTLE_RACE: {
    id: 'turtlerace',
    name: 'Turtle Race',
    path: '/app/games/turtlerace',
    description: 'Race to win in a thrilling format with multiple participants',
    category: 'live',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'turtleraceSocketUrl',
    icon: '/assets/images/games/turtle.png'
  },
  MINES: {
    id: 'mines',
    name: 'Mines',
    path: '/app/games/mines',
    description: 'Find safe spots, avoid bombs! Strategic game of chance',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'minesSocketUrl',
    icon: '/assets/images/games/mines.png'
  },
  DICE: {
    id: 'dice',
    name: 'Dice',
    path: '/app/games/dice',
    description: 'Traditional luck-based dice game with customizable odds',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'diceSocketUrl',
    icon: '/assets/images/games/dice.png'
  },
  PLINKO: {
    id: 'plinko',
    name: 'Plinko',
    path: '/app/games/plinko',
    description: 'Drop the ball and win rewards',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'plinkoSocketUrl',
    icon: '/assets/images/games/plinko.png'
  },
  SLOT: {
    id: 'slot',
    name: 'Slot',
    path: '/app/games/slot',
    description: 'Spin the reels, win rewards! Classic slot machine experience',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'slotSocketUrl',
    icon: '/assets/images/games/slot.png'
  },
  CRASH: {
    id: 'crash',
    name: 'Crash',
    path: '/app/games/crash',
    description: 'Bet before the graph crashes! High-risk, high-reward game',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: 'crashSocketUrl',
    icon: '/assets/images/games/crash.png'
  },
  BLACKJACK: {
    id: 'blackjack',
    name: 'Blackjack',
    path: '/app/games/blackjack',
    description: 'Classic card game with crypto rewards',
    category: 'casino',
    minBet: 0.01,
    maxBet: 10000,
    socketUrl: null,
    icon: '/assets/images/games/blackjack.png'
  }
};

export const getGameById = (id) => {
  return Object.values(GAME_CONFIG).find(game => game.id === id);
};

export const getGamesByCategory = (category) => {
  return Object.values(GAME_CONFIG).filter(game => game.category === category);
};

export const getAllGames = () => {
  return Object.values(GAME_CONFIG);
};

