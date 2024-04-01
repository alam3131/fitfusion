import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material'
import Deadpool from '../assets/images/deadpool_avatar.png';

const AvatarStatus = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Avatar Keep Training!</Typography>
      <Box sx={{ mb: 2 }}>
        <img src={Deadpool} alt="avatar" style={{ width: '200px', height: '190px', margin: '0 20px', marginLeft: '600px', border: '2px solid black'}}/>
      </Box>
      <Stack direction="column">
        <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>You have 3000 points!</Typography>
        <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Buy new Avatars: 
        </Typography>
        {/* Implement the avatar selection and checkout here */}
        <Button component={Link} to="/order_summary" variant="contained" color="primary" sx={{ mt: 25, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Checkout
        </Button>
      </Stack>
      
    </Box>
  );
}

export default AvatarStatus

