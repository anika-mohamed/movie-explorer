import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Header({ toggleTheme, isDarkMode }) {
  const { user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Movie Explorer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button component={Link} to="/favorites" color="inherit">
            My Favorites
          </Button>
          {!user?.isLoggedIn ? (
            <IconButton component={Link} to="/login" color="inherit">
              <Person />
            </IconButton>
          ) : (
            <Typography variant="body2" sx={{ ml: 2 }}>
              Hi, {user.username}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;