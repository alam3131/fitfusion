import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material'
import CharacterGrid from '../components/CharacterGrid';

const AvatarStatus = ({ selectedImages, setSelectedImages, points, shopItems }) => {
  const [isVisible, setIsVisible] = useState(false);
  let navigate = useNavigate();

  // Function to handle the "Buy" button click
  const handleCheckout = () => {
    if (selectedImages.length >= 1) {
      setIsVisible(false);
    
      navigate("/order_summary");
    } else {
      // Display a message that you don't have enough money
      setIsVisible(true);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 10, ml: 73}}>Avatar Shop</Typography>
      <Stack direction="column">
        {/* <Typography variant="subtitle1" sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>You have {points} points!</Typography> */}
        <CharacterGrid selectedImages={selectedImages} setSelectedImages={setSelectedImages} shopItems={shopItems}/>
        {isVisible && <Typography variant="subtitle1" color="RED" sx={{ mt: 12, mb: -16, ml:70}}>Please select at least one item to checkout</Typography>}
        <Button 
          onClick={() => handleCheckout()} 
          variant="contained" 
          color="primary" 
          sx={{ mt: 17, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Checkout
        </Button>
      </Stack>
      
    </Box>
  );
}

export default AvatarStatus

