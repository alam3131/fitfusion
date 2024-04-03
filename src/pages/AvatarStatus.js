import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material'
import Deadpool from '../assets/images/deadpool_avatar.png';
import CharacterGrid from '../components/CharacterGrid';

const AvatarStatus = ({ selectedImages, setSelectedImages }) => {
  console.log("Selected Images in AvatarStatus:", selectedImages); // Add this line to log selectedImages
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Avatar Keep Training!</Typography>
      <Stack direction="column">
        <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>You have 3000 points!</Typography>
        <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Buy new Avatars: 
        </Typography>
        <CharacterGrid selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        {/* Implement the avatar selection and checkout here */}
        <Button component={Link} to="/order_summary" variant="contained" color="primary" sx={{ mt: 25, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Checkout
        </Button>
      </Stack>
      
    </Box>
  );
}

export default AvatarStatus

