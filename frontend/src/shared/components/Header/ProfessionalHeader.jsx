import React, { useState, useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Select, FormControl, Avatar, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { GameDropdown } from '../Navigation';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1200
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    minHeight: '64px',
    [theme.breakpoints.down('md')]: {
      padding: '0 16px',
      minHeight: '56px'
    }
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit'
  },
  logo: {
    height: '40px',
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '32px'
    }
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  navItem: {
    padding: '8px 16px',
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.text.primary,
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.primary.main
    }
  },
  activeNavItem: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  walletButton: {
    background: `linear-gradient(48.57deg, ${theme.palette.primary.main} 24.42%, ${theme.palette.secondary.main} 88.19%)`,
    color: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: '8px',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[4]
    }
  },
  currencySelect: {
    minWidth: '120px',
    '& .MuiSelect-select': {
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: 600
    }
  },
  balanceDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: theme.palette.action.selected,
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  balanceAmount: {
    fontWeight: 700,
    fontSize: '16px',
    color: theme.palette.text.primary
  },
  balanceCurrency: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
    textTransform: 'uppercase'
  },
  profileButton: {
    padding: '4px'
  },
  mobileMenuButton: {
    display: 'none',
    [theme.breakpoints.down('lg')]: {
      display: 'block'
    }
  },
  mobileMenu: {
    '& .MuiPaper-root': {
      width: '280px',
      maxWidth: 'calc(100vw - 32px)'
    }
  }
}));

const ProfessionalHeader = ({ onWalletClick, onProfileClick, onMenuClick }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const authData = useSelector((state) => state.authentication);
  const currencies = useSelector((state) => state.payment?.currencies || []);
  const currentCurrency = useSelector((state) => state.authentication?.currency || 'USD');
  const balance = useSelector((state) => state.authentication?.balance || 0);

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const isAuthenticated = authData?.isAuthenticated;

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isRouteActive = (path) => {
    if (path === '/app/home') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const mainNavItems = [
    NAVIGATION_ITEMS.HOME,
    NAVIGATION_ITEMS.BONUSES,
    NAVIGATION_ITEMS.TOURNAMENTS,
    NAVIGATION_ITEMS.AFFILIATE,
    NAVIGATION_ITEMS.HELP
  ];

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar className={classes.toolbar}>
        {/* Logo */}
        <Link to="/app/home" className={classes.logoContainer}>
          <img 
            src="/assets/icons/Logo.svg" 
            alt="Logo" 
            className={classes.logo}
          />
        </Link>

        {/* Desktop Navigation */}
        <Box className={classes.navContainer}>
          {mainNavItems.map((item) => {
            if (item.path === '/app/games') {
              return (
                <GameDropdown key={item.path} />
              );
            }
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                className={`${classes.navItem} ${isRouteActive(item.path) ? classes.activeNavItem : ''}`}
              >
                {item.label}
              </Button>
            );
          })}
          <GameDropdown />
        </Box>

        {/* Right Section */}
        <Box className={classes.rightSection}>
          {isAuthenticated ? (
            <>
              {/* Balance Display */}
              <Box className={classes.balanceDisplay}>
                <span className={classes.balanceAmount}>
                  {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={classes.balanceCurrency}>{currentCurrency}</span>
              </Box>

              {/* Currency Selector */}
              <FormControl size="small" className={classes.currencySelect}>
                <Select
                  value={currentCurrency}
                  onChange={(e) => {
                    // Handle currency change
                    dispatch({ type: 'UPDATE_CURRENCY', payload: e.target.value });
                  }}
                  sx={{
                    color: 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.symbol} value={currency.symbol}>
                      {currency.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Wallet Button */}
              <Button
                className={classes.walletButton}
                onClick={onWalletClick}
              >
                Wallet
              </Button>

              {/* Profile Avatar */}
              <IconButton
                className={classes.profileButton}
                onClick={onProfileClick}
              >
                <Avatar
                  src={authData?.avatar}
                  alt={authData?.username || 'User'}
                  sx={{ width: 32, height: 32 }}
                >
                  {(authData?.username || 'U').charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate('/app/home')}
                className={classes.navItem}
              >
                Sign In
              </Button>
              <Button
                className={classes.walletButton}
                onClick={onWalletClick}
              >
                Register
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <IconButton
            className={classes.mobileMenuButton}
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          className={classes.mobileMenu}
        >
          {mainNavItems.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMobileMenuClose}
              selected={isRouteActive(item.path)}
            >
              {item.label}
            </MenuItem>
          ))}
          {NAVIGATION_ITEMS.GAMES.children?.map((game) => (
            <MenuItem
              key={game.path}
              component={Link}
              to={game.path}
              onClick={handleMobileMenuClose}
              selected={location.pathname === game.path}
              sx={{ pl: 4 }}
            >
              {game.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default ProfessionalHeader;

