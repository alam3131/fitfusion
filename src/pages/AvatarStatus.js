import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material'
import CharacterGrid from '../components/CharacterGrid';

const AvatarStatus = ({ selectedImages, setSelectedImages, points, shopItems }) => {
  console.log("Selected Images in AvatarStatus:", selectedImages); // Add this line to log selectedImages
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2, ml: 73}}>Avatar Shop</Typography>
      <Stack direction="column">
        <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>You have {points} points!</Typography>
        <CharacterGrid selectedImages={selectedImages} setSelectedImages={setSelectedImages} shopItems={shopItems}/>
        {/* Implement the avatar selection and checkout here */}
        <Button component={Link} to="/order_summary" variant="contained" color="primary" sx={{ mt: 25, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Checkout
        </Button>
      </Stack>
      
    </Box>
  );
}

export default AvatarStatus

