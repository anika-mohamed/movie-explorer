// src/components/LoadingIndicator.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingIndicator({ message }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <CircularProgress size={40} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default LoadingIndicator;