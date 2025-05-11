// src/components/ErrorDisplay.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function ErrorDisplay({ message, onRetry }) {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h6" color="error" gutterBottom>
        {message || 'Something went wrong'}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {onRetry && (
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Refresh />} 
            onClick={onRetry}
            sx={{ mr: 2 }}
          >
            Try Again
          </Button>
        )}
        <Button 
          variant="outlined" 
          component={Link} 
          to="/" 
          startIcon={<Home />}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorDisplay;