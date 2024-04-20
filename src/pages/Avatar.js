import React, { useState, useEffect} from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Avatar = ({ selectedAvatar, setSelectedAvatar, points, inventory }) => {
  // Function to handle avatar click
  const handleAvatarClick = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ ml: 77, mb: 2 }} style={{ fontWeight: 'bold' }}>Change Avatar:</Typography>
      <Box sx={{ mb: 2 }}>
        <img src={selectedAvatar} alt="avatar" style={{ width: '200px', height: '190px', margin: '0 20px', marginLeft: '600px', border: '2px solid black'}}/>
      </Box>
      <Typography mt={5} textAlign={"center"} style={{ fontWeight: 'bold' }} variant="h6">Your Inventory:</Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {inventory.map((avatar, index) => (
          <Grid item key={avatar.name}>
            <Card 
              sx={{ maxWidth: 150 }}
              onClick={() => handleAvatarClick(avatar.src)}
              style={{
                cursor: 'pointer',
                border: selectedAvatar === avatar.src
                  ? '6px solid orange'
                  : '6px solid transparent',
            }}
            >
              <CardMedia
                component="img"
                image={avatar.src}
                alt={`Selected Image ${index}`}
              />
              <Typography textAlign="center">{avatar.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button component={Link} to="/avatar_status" variant="contained" color="primary" sx={{ mt: 7, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
        Buy More!
      </Button>
    </Box>
  );
}

export default Avatar