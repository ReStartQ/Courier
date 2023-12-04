import { CircularProgress } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import React from 'react';

const LoadingNews = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh)',
        width: '100%',
      }}
    >
      <Box display="flex" flexDirection="row">
        <CircularProgress variant="soft" size="sm" sx={{ mr: '10px' }} />
        <Typography>Loading</Typography>
      </Box>
    </Box>
  );
};

export default LoadingNews;
