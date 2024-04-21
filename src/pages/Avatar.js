import React, { useState, useEffect} from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Deadpool from '../assets/images/deadpool_avatar.png';
import Harley from '../assets/images/harley_quinn.png';
import Joker from '../assets/images/joker.png';
import Batgirl from '../assets/images/batgirl.png';
import Venom from '../assets/images/venom.png';
import Thanos from '../assets/images/thanos_avatar.png';
import Antman from '../assets/images/antman.png';


const Avatar = ({ selectedAvatar, setSelectedAvatar, points, inventory }) => {
  // Function to handle avatar click
  const handleAvatarClick = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Change Avatar:</Typography>
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