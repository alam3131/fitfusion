import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import AvatarIcon from '../assets/images/deadpool_avatar.png'; // Update with your path

const Avatar = () => {
  // Add your avatar images here
  const avatars = [
    { name: 'Avatar 1', src: 'path-to-avatar-1', xp: 500 },
    { name: 'Avatar 2', src: 'path-to-avatar-2', xp: 1000 },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Change Avatar:</Typography>
      <Box sx={{ mb: 2 }}>
        <AvatarIcon /> {/* Your main avatar component */}
      </Box>
      <Typography variant="h6">Your Inventory:</Typography>
      <Grid container spacing={2}>
        {avatars.map((avatar) => (
          <Grid item key={avatar.name}>
            {/* Replace with your avatar image component */}
            <img src={avatar.src} alt={avatar.name} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Total xp: 3000</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Buy More!
      </Button>
    </Box>
  );
}

export default Avatar