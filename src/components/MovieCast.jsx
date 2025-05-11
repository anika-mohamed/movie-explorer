// src/components/MovieCast.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

function MovieCast({ cast }) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {cast.slice(0, 6).map((person) => (
        <Grid item key={person.id} xs={4} sm={4} md={2}>
          <Paper elevation={2} sx={{ height: '100%' }}>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : 'https://via.placeholder.com/185x278?text=No+Image'
              }
              alt={person.name}
              style={{ width: '100%', height: 'auto' }}
            />
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {person.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {person.character}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieCast;