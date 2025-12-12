import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Config from '../../config/baseConfig';
import { GAME_CONFIG } from '../../features/games/constants/gameConfig';

/**
 * Custom hook for managing game socket connections
 * Provides a clean interface for socket communication in games
 */
export const useGameSocket = (gameId) => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState(null);
  const socketRef = useRef(null);
  const gameConfig = GAME_CONFIG[gameId?.toUpperCase()];

  useEffect(() => {
    if (!gameConfig || !gameConfig.socketUrl) {
      return;
    }

    const socketUrl = Config.Root[gameConfig.socketUrl];
    if (!socketUrl) {
      console.warn(`Socket URL not configured for game: ${gameId}`);
      return;
    }

    // Initialize socket connection
    const socket = require('socket.io-client')(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    socketRef.current = socket;

    // Connection handlers
    socket.on('connect', () => {
      setIsConnected(true);
      console.log(`Connected to ${gameId} game socket`);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log(`Disconnected from ${gameId} game socket`);
    });

    socket.on('error', (error) => {
      console.error(`Socket error for ${gameId}:`, error);
    });

    // Game-specific event handlers
    socket.on('gameState', (data) => {
      setGameData(data);
    });

    socket.on('gameUpdate', (data) => {
      setGameData(prev => ({ ...prev, ...data }));
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [gameId, gameConfig]);

  // Emit function
  const emit = (event, data) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn(`Cannot emit ${event}: Socket not connected`);
    }
  };

  // Subscribe to custom event
  const subscribe = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  // Unsubscribe from custom event
  const unsubscribe = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return {
    isConnected,
    gameData,
    emit,
    subscribe,
    unsubscribe,
    socket: socketRef.current
  };
};

export default useGameSocket;

