import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '12px 24px',
    height: '48px',
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
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
  icon: {
    marginRight: '10px',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none'
  }
}));

const NavigationItem = ({ item, onClick }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive = location.pathname === item.path || 
                   (item.children && item.children.some(child => location.pathname === child.path));

  return (
    <Link
      to={item.path}
      className={clsx(classes.navItem, isActive && classes.active)}
      onClick={onClick}
    >
      {item.icon && (
        <Box className={classes.icon}>
          {/* Icon will be rendered by parent component */}
        </Box>
      )}
      <Typography className={classes.label}>
        {item.label}
      </Typography>
    </Link>
  );
};

export default NavigationItem;

