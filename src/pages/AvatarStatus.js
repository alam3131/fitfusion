import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AvatarIcon from './path-to-your-avatar-icon'; // Update with your path

const AvatarStatus = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Avatar Keep Training!</Typography>
      <Box sx={{ mb: 2 }}>
        <AvatarIcon /> {/* Your main avatar component */}
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>You have 3000 points!</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Buy new Avatar
      </Button>
      {/* Implement the avatar selection and checkout here */}
      <Button variant="contained" color="secondary">
        Checkout
      </Button>
    </Box>
  );
}

export default AvatarStatus

