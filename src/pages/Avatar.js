import React, { useState, useEffect} from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Avatar = ({ selectedAvatar, setSelectedAvatar, points, inventory }) => {
  // Function to handle avatar click
  const handleAvatarClick = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ ml: 77, mb: 2 }}>Change Avatar:</Typography>
      <Box sx={{ mb: 2 }}>
        <img src={selectedAvatar} alt="avatar" style={{ width: '200px', height: '190px', margin: '0 20px', marginLeft: '600px', border: '2px solid black'}}/>
      </Box>
      <Typography variant="h6">Your Inventory:</Typography>
      <Grid container spacing={2}>
        {inventory.map((avatar) => (
          <Grid item key={avatar.name}>
            <img src={avatar.src} alt={avatar.name}
            onClick = {() => handleAvatarClick(avatar.src)}
            style = {{ cursor: 'pointer' }} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Total xp: {points}</Typography>
      <Button component={Link} to="/avatar_status" variant="contained" color="primary" sx={{ mt: 7, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
        Buy More!
      </Button>
    </Box>
  );
}

export default Avatar