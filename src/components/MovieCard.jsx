import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';

function MovieCard({ id, title, posterPath, releaseDate, voteAverage }) {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card 
      component={Link} 
      to={`/movie/${id}`} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{ aspectRatio: '2/3' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="subtitle1" component="h3" noWrap>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {year}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={voteAverage / 2} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {voteAverage.toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;