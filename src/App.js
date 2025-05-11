// src/App.js - Corrected version
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [mode, setMode] = useState('light');

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage toggleTheme={toggleTheme} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/movie/:id" element={<MoviePage toggleTheme={toggleTheme} />} />
              <Route path="/search" element={<SearchPage toggleTheme={toggleTheme} />} />
              <Route path="/favorites" element={<FavoritesPage toggleTheme={toggleTheme} />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;