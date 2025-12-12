/**
 * Route Helper Utilities
 * Centralized route management and navigation helpers
 */

export const ROUTES = {
  HOME: '/app/home',
  GAMES: {
    BASE: '/app/games',
    LIST: '/app/games',
    SCISSOR: '/app/games/scissor',
    TURTLE_RACE: '/app/games/turtlerace',
    MINES: '/app/games/mines',
    DICE: '/app/games/dice',
    PLINKO: '/app/games/plinko',
    SLOT: '/app/games/slot',
    CRASH: '/app/games/crash',
    BLACKJACK: '/app/games/blackjack'
  },
  BONUSES: '/app/bonues',
  TOURNAMENTS: '/app/tournaments',
  AFFILIATE: '/app/affiliate',
  HELP: '/app/help',
  PROFILE: '/app/profile',
  SETTINGS: '/app/settings'
};

/**
 * Check if current route matches a game route
 */
export const isGameRoute = (pathname) => {
  return pathname.startsWith(ROUTES.GAMES.BASE);
};

/**
 * Get game name from route
 */
export const getGameFromRoute = (pathname) => {
  const gameRoutes = Object.values(ROUTES.GAMES);
  const matchedRoute = gameRoutes.find(route => pathname === route);
  
  if (matchedRoute) {
    const routeKey = Object.keys(ROUTES.GAMES).find(
      key => ROUTES.GAMES[key] === matchedRoute
    );
    return routeKey?.toLowerCase().replace('_', '-') || null;
  }
  
  return null;
};

/**
 * Check if route is active
 */
export const isRouteActive = (currentPath, targetPath, exact = false) => {
  if (exact) {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
};

