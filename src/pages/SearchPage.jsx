// src/pages/SearchPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, CircularProgress, Pagination } from '@mui/material';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';
import { useTheme } from '@mui/material/styles';
import { FormControlLabel, Switch } from '@mui/material';

function SearchPage({ toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  
  // For infinite scrolling
  const observer = useRef();
  const [hasMore, setHasMore] = useState(false);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(true);
  // Parse query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query');
    const pageParam = searchParams.get('page');
    
    if (queryParam) {
      setQuery(queryParam);
      setPage(pageParam ? parseInt(pageParam, 10) : 1);
    } else {
      navigate('/');
    }
  }, [location.search, navigate]);

  // Fetch search results
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { results, totalPages: total } = await searchMovies(query, page);
        
        if (infiniteScrollEnabled && page > 1) {
          setMovies(prev => [...prev, ...results]);
        } else {
          setMovies(results);
        }
        
        setTotalPages(total);
        setHasMore(page < total);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page, infiniteScrollEnabled]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    navigate(`/search?query=${encodeURIComponent(query)}&page=${value}`);
    window.scrollTo(0, 0);
  };

  // Last element ref for infinite scrolling
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && infiniteScrollEnabled) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, infiniteScrollEnabled]);

  // Toggle infinite scroll
  const toggleInfiniteScroll = () => {
    setInfiniteScrollEnabled(prev => !prev);
    if (!infiniteScrollEnabled) {
      // Reset to first page when enabling infinite scroll
      setPage(1);
      setMovies([]);
    }
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar initialQuery={query} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Search Results for "{query}"
          </Typography>
          <FormControlLabel
  control={
    <Switch
      checked={infiniteScrollEnabled}
      onChange={toggleInfiniteScroll}
      color="primary"
    />
  }
  label="Infinite Scroll"
/>
        </Box>
        
        {loading && page === 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ py: 5 }}>
            <Typography color="error" align="center">{error}</Typography>
          </Box>
        ) : movies.length === 0 ? (
          <Box sx={{ py: 5 }}>
            <Typography align="center">No movies found for "{query}". Try a different search term.</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {movies.map((movie, index) => {
                // If this is the last element and infinite scroll is enabled
                if (movies.length === index + 1 && infiniteScrollEnabled) {
                  return (
                    <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4} ref={lastMovieElementRef}>
                      <MovieCard
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        releaseDate={movie.release_date}
                        voteAverage={movie.vote_average}
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
                      <MovieCard
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        releaseDate={movie.release_date}
                        voteAverage={movie.vote_average}
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
            
            {loading && page > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            )}
            
            {!infiniteScrollEnabled && totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={Math.min(totalPages, 10)} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default SearchPage;