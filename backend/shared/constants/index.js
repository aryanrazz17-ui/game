/**
 * Shared Constants
 * Centralized constants for backend services
 */

module.exports = {
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },

  GAME_TYPES: {
    SCISSOR: 'scissor',
    TURTLE_RACE: 'turtlerace',
    MINES: 'mines',
    DICE: 'dice',
    PLINKO: 'plinko',
    SLOT: 'slot',
    CRASH: 'crash',
    BLACKJACK: 'blackjack'
  },

  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    ERROR: 'error',
    GAME_STATE: 'gameState',
    GAME_UPDATE: 'gameUpdate',
    BET_PLACED: 'betPlaced',
    BET_RESULT: 'betResult',
    ROUND_START: 'roundStart',
    ROUND_END: 'roundEnd'
  },

  BET_STATUS: {
    PENDING: 'pending',
    WON: 'won',
    LOST: 'lost',
    CANCELLED: 'cancelled'
  },

  TRANSACTION_TYPES: {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    BET: 'bet',
    WIN: 'win',
    BONUS: 'bonus',
    REFUND: 'refund'
  }
};

