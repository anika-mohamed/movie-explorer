import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  // Get query from URL if on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('query');
      if (searchQuery) {
        setQuery(searchQuery);
      }
    } else {
      // Try to get last search from localStorage when on home page
      const lastSearch = localStorage.getItem('lastSearch');
      if (lastSearch && location.pathname === '/') {
        setQuery(lastSearch);
      }
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Save last search to localStorage
      localStorage.setItem('lastSearch', query);
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto', my: 3 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;