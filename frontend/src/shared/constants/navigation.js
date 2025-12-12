/**
 * Navigation Configuration
 * Centralized navigation structure following professional patterns
 */

export const NAVIGATION_ITEMS = {
  HOME: {
    path: '/app/home',
    label: 'Home',
    icon: 'HomeIcon',
    category: 'main'
  },
  GAMES: {
    path: '/app/games',
    label: 'Games',
    icon: 'GamesIcon',
    category: 'main',
    children: [
      {
        path: '/app/games/scissor',
        label: 'Scissors',
        icon: 'ScissorsIcon',
        description: 'Classic multiplayer hand game'
      },
      {
        path: '/app/games/turtlerace',
        label: 'Turtle Race',
        icon: 'TurtleIcon',
        description: 'Race to win in thrilling format'
      },
      {
        path: '/app/games/mines',
        label: 'Mines',
        icon: 'MinesIcon',
        description: 'Find safe spots, avoid bombs'
      },
      {
        path: '/app/games/dice',
        label: 'Dice',
        icon: 'DiceIcon',
        description: 'Traditional luck-based dice game'
      },
      {
        path: '/app/games/plinko',
        label: 'Plinko',
        icon: 'PlinkoIcon',
        description: 'Drop the ball and win'
      },
      {
        path: '/app/games/slot',
        label: 'Slot',
        icon: 'SlotIcon',
        description: 'Spin the reels, win rewards'
      },
      {
        path: '/app/games/crash',
        label: 'Crash',
        icon: 'CrashIcon',
        description: 'Bet before the graph crashes'
      },
      {
        path: '/app/games/blackjack',
        label: 'Blackjack',
        icon: 'BlackjackIcon',
        description: 'Classic card game'
      }
    ]
  },
  BONUSES: {
    path: '/app/bonues',
    label: 'Bonuses',
    icon: 'BonusIcon',
    category: 'main'
  },
  TOURNAMENTS: {
    path: '/app/tournaments',
    label: 'Tournaments',
    icon: 'TournamentIcon',
    category: 'main'
  },
  AFFILIATE: {
    path: '/app/affiliate',
    label: 'Affiliate',
    icon: 'AffiliateIcon',
    category: 'main'
  },
  HELP: {
    path: '/app/help',
    label: 'Help Center',
    icon: 'HelpIcon',
    category: 'main'
  }
};

export const GAME_CATEGORIES = {
  LIVE_GAMES: {
    label: 'Live Games',
    games: ['scissor', 'turtlerace']
  },
  CASINO_GAMES: {
    label: 'Casino Games',
    games: ['dice', 'mines', 'plinko', 'slot', 'crash', 'blackjack']
  },
  VIRTUAL_GAMES: {
    label: 'Virtual Games',
    games: []
  }
};

export const getNavigationItems = () => {
  return Object.values(NAVIGATION_ITEMS);
};

export const getGameByPath = (path) => {
  const allGames = [];
  Object.values(NAVIGATION_ITEMS).forEach(item => {
    if (item.children) {
      allGames.push(...item.children);
    }
  });
  return allGames.find(game => game.path === path);
};

