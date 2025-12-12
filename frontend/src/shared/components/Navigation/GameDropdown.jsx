import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

const useStyles = makeStyles((theme) => ({
  dropdownContainer: {
    position: 'relative'
  },
  dropdownTrigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '12px 24px',
    height: '48px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main,
      '&::after': {
        opacity: 1
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '4px',
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      opacity: 0,
      transition: 'opacity 0.3s ease',
      borderRadius: '0 2px 2px 0'
    }
  },
  active: {
    color: theme.palette.primary.main,
    '&::after': {
      opacity: 1
    }
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: '280px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    boxShadow: theme.shadows[8],
    padding: '8px',
    zIndex: 1300,
    marginTop: '4px'
  },
  gameItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    transition: 'all 0.2s ease',
    marginBottom: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateX(4px)'
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  gameIcon: {
    width: '32px',
    height: '32px',
    marginRight: '12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.action.selected
  },
  gameInfo: {
    flex: 1
  },
  gameName: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '2px'
  },
  gameDescription: {
    fontSize: '12px',
    color: theme.palette.text.secondary
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    marginLeft: '10px'
  }
}));

const GameDropdown = ({ onClose }) => {
  const classes = useStyles();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const games = NAVIGATION_ITEMS.GAMES.children || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isActive = location.pathname.startsWith('/app/games');

  return (
    <Box 
      className={classes.dropdownContainer} 
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Box className={clsx(classes.dropdownTrigger, isActive && classes.active)}>
        <Box className={classes.icon}>
          {/* Icon placeholder */}
        </Box>
        <Typography className={classes.label}>Games</Typography>
      </Box>
      
      {isOpen && (
        <Paper className={classes.dropdownMenu}>
          {games.map((game, index) => {
            const isGameActive = location.pathname === game.path;
            return (
              <Link
                key={index}
                to={game.path}
                className={classes.gameItem}
                onClick={() => {
                  setIsOpen(false);
                  if (onClose) onClose();
                }}
                style={{
                  backgroundColor: isGameActive ? 'rgba(90, 69, 209, 0.1)' : 'transparent'
                }}
              >
                <Box className={classes.gameIcon}>
                  {/* Game icon placeholder */}
                </Box>
                <Box className={classes.gameInfo}>
                  <Typography className={classes.gameName}>
                    {game.label}
                  </Typography>
                  {game.description && (
                    <Typography className={classes.gameDescription}>
                      {game.description}
                    </Typography>
                  )}
                </Box>
              </Link>
            );
          })}
        </Paper>
      )}
    </Box>
  );
};

export default GameDropdown;

