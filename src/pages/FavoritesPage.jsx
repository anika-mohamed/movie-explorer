// src/pages/FavoritesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button, Paper } from '@mui/material';
import { ArrowBack, MovieFilter } from '@mui/icons-material';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

function FavoritesPage({ toggleTheme }) {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<ArrowBack />} 
            component={Link} 
            to="/"
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          <Typography variant="h4" component="h1">
            My Favorites
          </Typography>
        </Box>
        
        {!user?.isLoggedIn ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Please log in to view your favorites
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/login"
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Paper>
        ) : favorites.length === 0 ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <MovieFilter sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              You haven't added any favorites yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Start exploring movies and click the heart icon to add them to your favorites.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/"
              sx={{ mt: 2 }}
            >
              Explore Movies
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((movie) => (
              <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default FavoritesPage;