import { Box, Button, Tabs, Tab, Card, CardContent, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles(() => ({
    RootContainer: {
        width: '100%',
        height: '100%',
        padding: '100px 50px 40px 50px',
        background: '#1f1e25',
        minHeight: 'calc(100vh - 100px)',
        "@media (max-width: 681px)": {
            padding: '80px 14px 20px 14px'
        }
    },
    HeaderBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        "@media (max-width: 681px)": {
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-start'
        }
    },
    Title: {
        fontFamily: "'Styrene A Web'",
        fontWeight: '900',
        fontSize: '42px',
        lineHeight: '52px',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        textShadow: '-6px 6px 0px rgba(0, 0, 0, 0.25)',
        "@media (max-width: 681px)": {
            fontSize: '28px',
            lineHeight: '36px'
        }
    },
    TabsContainer: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '24px',
        '& .MuiTabs-indicator': {
            backgroundColor: '#FED847'
        }
    },
    Tab: {
        color: 'rgba(255, 255, 255, 0.6)',
        textTransform: 'uppercase',
        fontFamily: "'Styrene A Web'",
        fontWeight: '700',
        fontSize: '14px',
        '&.Mui-selected': {
            color: '#FED847'
        }
    },
    SportsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '24px',
        "@media (max-width: 681px)": {
            gridTemplateColumns: '1fr',
            gap: '16px'
        }
    },
    MatchCard: {
        background: '#2C2C3A',
        border: '1px solid #363646',
        borderRadius: '12px',
        padding: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#715AE0',
            transform: 'translateY(-2px)'
        }
    },
    MatchHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    LeagueName: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '12px',
        textTransform: 'uppercase'
    },
    MatchTime: {
        color: '#FED847',
        fontSize: '12px',
        fontWeight: '600'
    },
    TeamsBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px'
    },
    TeamRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TeamName: {
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: "'Styrene A Web'"
    },
    OddsBox: {
        display: 'flex',
        gap: '8px'
    },
    OddButton: {
        minWidth: '60px',
        height: '40px',
        background: '#363646',
        color: '#FFFFFF',
        border: '1px solid #363646',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        '&:hover': {
            background: 'linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)',
            borderColor: '#715AE0'
        }
    },
    LiveBadge: {
        background: '#FF0000',
        color: '#FFFFFF',
        fontSize: '10px',
        fontWeight: '700',
        padding: '4px 8px',
        borderRadius: '4px',
        textTransform: 'uppercase'
    },
    BetSlipBox: {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        background: '#2C2C3A',
        border: '1px solid #363646',
        borderRadius: '12px',
        padding: '20px',
        minWidth: '300px',
        maxWidth: '400px',
        maxHeight: '500px',
        overflowY: 'auto',
        zIndex: 1000,
        "@media (max-width: 681px)": {
            right: '10px',
            bottom: '10px',
            minWidth: '280px',
            maxWidth: 'calc(100vw - 20px)'
        }
    },
    BetSlipTitle: {
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '16px',
        fontFamily: "'Styrene A Web'"
    },
    BetItem: {
        background: '#363646',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px'
    },
    BetItemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    BetItemTeam: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '600'
    },
    BetItemOdd: {
        color: '#FED847',
        fontSize: '14px',
        fontWeight: '600'
    },
    BetItemInput: {
        width: '100%',
        background: '#2C2C3A',
        border: '1px solid #363646',
        borderRadius: '6px',
        padding: '8px',
        color: '#FFFFFF',
        fontSize: '14px',
        marginBottom: '8px'
    },
    PlaceBetButton: {
        width: '100%',
        height: '48px',
        background: 'linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)',
        color: '#FFFFFF',
        borderRadius: '8px',
        textTransform: 'uppercase',
        fontFamily: "'Styrene A Web'",
        fontWeight: '700',
        fontSize: '14px',
        marginTop: '16px',
        '&:hover': {
            opacity: 0.8
        }
    },
    EmptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'rgba(255, 255, 255, 0.6)'
    }
}));

// Mock data for sports matches
const mockMatches = [
    {
        id: 1,
        league: 'Premier League',
        team1: 'Manchester United',
        team2: 'Liverpool',
        time: 'Today 15:00',
        isLive: false,
        odds: { team1: 2.50, draw: 3.20, team2: 2.80 }
    },
    {
        id: 2,
        league: 'NBA',
        team1: 'Lakers',
        team2: 'Warriors',
        time: 'Live',
        isLive: true,
        odds: { team1: 1.85, team2: 1.95 }
    },
    {
        id: 3,
        league: 'UEFA Champions League',
        team1: 'Real Madrid',
        team2: 'Barcelona',
        time: 'Tomorrow 20:00',
        isLive: false,
        odds: { team1: 2.10, draw: 3.40, team2: 3.20 }
    },
    {
        id: 4,
        league: 'ATP Tennis',
        team1: 'Djokovic',
        team2: 'Nadal',
        time: 'Today 18:00',
        isLive: false,
        odds: { team1: 1.75, team2: 2.05 }
    },
    {
        id: 5,
        league: 'NFL',
        team1: 'Patriots',
        team2: 'Chiefs',
        time: 'Sunday 19:00',
        isLive: false,
        odds: { team1: 2.30, team2: 1.65 }
    },
    {
        id: 6,
        league: 'La Liga',
        team1: 'Atletico Madrid',
        team2: 'Sevilla',
        time: 'Live',
        isLive: true,
        odds: { team1: 2.00, draw: 3.10, team2: 3.50 }
    }
];

const Sports = () => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const [activeTab, setActiveTab] = useState(0);
    const [selectedSport, setSelectedSport] = useState('all');
    const [betSlip, setBetSlip] = useState([]);
    const [betAmounts, setBetAmounts] = useState({});

    const sports = [
        { id: 'all', name: 'All Sports' },
        { id: 'football', name: 'Football' },
        { id: 'basketball', name: 'Basketball' },
        { id: 'tennis', name: 'Tennis' },
        { id: 'american-football', name: 'American Football' }
    ];

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleAddToBetSlip = (match, selection, odd) => {
        const betId = `${match.id}-${selection}`;
        const existingBet = betSlip.find(bet => bet.id === betId);
        
        if (existingBet) {
            addToast('Bet already in bet slip', { appearance: 'warning' });
            return;
        }

        const newBet = {
            id: betId,
            matchId: match.id,
            league: match.league,
            team1: match.team1,
            team2: match.team2,
            selection,
            odd,
            match
        };

        setBetSlip([...betSlip, newBet]);
        setBetAmounts({ ...betAmounts, [betId]: '' });
        addToast('Bet added to bet slip', { appearance: 'success' });
    };

    const handleRemoveBet = (betId) => {
        setBetSlip(betSlip.filter(bet => bet.id !== betId));
        const newAmounts = { ...betAmounts };
        delete newAmounts[betId];
        setBetAmounts(newAmounts);
    };

    const handleBetAmountChange = (betId, amount) => {
        setBetAmounts({ ...betAmounts, [betId]: amount });
    };

    const calculatePotentialWin = () => {
        let totalOdds = 1;
        betSlip.forEach(bet => {
            const amount = parseFloat(betAmounts[bet.id] || 0);
            if (amount > 0) {
                totalOdds *= bet.odd;
            }
        });
        return totalOdds;
    };

    const handlePlaceBet = () => {
        if (betSlip.length === 0) {
            addToast('Please add bets to bet slip', { appearance: 'warning' });
            return;
        }

        const hasAmounts = betSlip.every(bet => {
            const amount = parseFloat(betAmounts[bet.id] || 0);
            return amount > 0;
        });

        if (!hasAmounts) {
            addToast('Please enter bet amounts', { appearance: 'warning' });
            return;
        }

        addToast('Bet placed successfully!', { appearance: 'success' });
        setBetSlip([]);
        setBetAmounts({});
    };

    const filteredMatches = selectedSport === 'all' 
        ? mockMatches 
        : mockMatches.filter(match => {
            // Simple filtering logic - in real app, matches would have sport category
            if (selectedSport === 'football') {
                return match.league.includes('League') || match.league.includes('Champions');
            }
            if (selectedSport === 'basketball') {
                return match.league === 'NBA';
            }
            if (selectedSport === 'tennis') {
                return match.league.includes('Tennis');
            }
            if (selectedSport === 'american-football') {
                return match.league === 'NFL';
            }
            return true;
        });

    const displayMatches = activeTab === 0 
        ? filteredMatches.filter(m => m.isLive)
        : activeTab === 1
        ? filteredMatches.filter(m => !m.isLive)
        : filteredMatches;

    return (
        <Box className={classes.RootContainer}>
            <Box className={classes.HeaderBox}>
                <Typography className={classes.Title}>Sports Betting</Typography>
                <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sports.map((sport) => (
                        <Chip
                            key={sport.id}
                            label={sport.name}
                            onClick={() => setSelectedSport(sport.id)}
                            sx={{
                                background: selectedSport === sport.id 
                                    ? 'linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)' 
                                    : '#363646',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className={classes.TabsContainer}
            >
                <Tab label="Live" className={classes.Tab} />
                <Tab label="Upcoming" className={classes.Tab} />
                <Tab label="All" className={classes.Tab} />
            </Tabs>

            <Box className={classes.SportsGrid}>
                {displayMatches.length === 0 ? (
                    <Box className={classes.EmptyState}>
                        <Typography>No matches available</Typography>
                    </Box>
                ) : (
                    displayMatches.map((match) => (
                        <Card key={match.id} className={classes.MatchCard}>
                            <CardContent>
                                <Box className={classes.MatchHeader}>
                                    <Typography className={classes.LeagueName}>
                                        {match.league}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {match.isLive && (
                                            <Chip label="LIVE" className={classes.LiveBadge} size="small" />
                                        )}
                                        <Typography className={classes.MatchTime}>
                                            {match.time}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className={classes.TeamsBox}>
                                    <Box className={classes.TeamRow}>
                                        <Typography className={classes.TeamName}>
                                            {match.team1}
                                        </Typography>
                                        <Box className={classes.OddsBox}>
                                            <Button
                                                className={classes.OddButton}
                                                onClick={() => handleAddToBetSlip(match, 'team1', match.odds.team1)}
                                            >
                                                {match.odds.team1}
                                            </Button>
                                            {match.odds.draw && (
                                                <Button
                                                    className={classes.OddButton}
                                                    onClick={() => handleAddToBetSlip(match, 'draw', match.odds.draw)}
                                                >
                                                    {match.odds.draw}
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box className={classes.TeamRow}>
                                        <Typography className={classes.TeamName}>
                                            {match.team2}
                                        </Typography>
                                        <Button
                                            className={classes.OddButton}
                                            onClick={() => handleAddToBetSlip(match, 'team2', match.odds.team2)}
                                        >
                                            {match.odds.team2}
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {betSlip.length > 0 && (
                <Box className={classes.BetSlipBox}>
                    <Typography className={classes.BetSlipTitle}>
                        Bet Slip ({betSlip.length})
                    </Typography>
                    {betSlip.map((bet) => (
                        <Box key={bet.id} className={classes.BetItem}>
                            <Box className={classes.BetItemHeader}>
                                <Typography className={classes.BetItemTeam}>
                                    {bet.team1} vs {bet.team2}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => handleRemoveBet(bet.id)}
                                    sx={{ color: '#FF0000', minWidth: 'auto', padding: '4px' }}
                                >
                                    ×
                                </Button>
                            </Box>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '8px' }}>
                                {bet.selection === 'team1' ? bet.team1 : bet.selection === 'team2' ? bet.team2 : 'Draw'} - {bet.odd}
                            </Typography>
                            <input
                                type="number"
                                placeholder="Bet Amount"
                                className={classes.BetItemInput}
                                value={betAmounts[bet.id] || ''}
                                onChange={(e) => handleBetAmountChange(bet.id, e.target.value)}
                            />
                        </Box>
                    ))}
                    {betSlip.length > 0 && (
                        <Box sx={{ marginTop: '16px', padding: '12px', background: '#363646', borderRadius: '8px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                                    Total Odds:
                                </Typography>
                                <Typography sx={{ color: '#FED847', fontSize: '14px', fontWeight: '600' }}>
                                    {calculatePotentialWin().toFixed(2)}x
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Button className={classes.PlaceBetButton} onClick={handlePlaceBet}>
                        Place Bet
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Sports;

