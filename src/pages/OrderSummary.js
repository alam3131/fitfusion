import React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material'

const OrderSummary = ({ selectedImages, setSelectedImages, points, losePoints, shopItems, setShopItems, inventory, setInventory }) => {
  // Calculates the total cost of the cart
  const getTotalXp = () => {
    let totalXp = 0;
    selectedImages.forEach(image => {
      totalXp += image.xp;
    });
    return totalXp;
  };

  const cartTotal = getTotalXp();

  // Function to handle the "Buy" button click
  const handleBuy = () => {
    // Filter out selected images from shopItems and add them to inventory
    const newShopItems = shopItems.filter(item => !selectedImages.some(image => image.src === item.src));
    const newInventory = [...inventory, ...selectedImages];
  
    // Update state to reflect changes
    setShopItems(newShopItems);
    setInventory(newInventory);

    losePoints(cartTotal);
  
    // Clear selected images
    setSelectedImages([]);
  };

  console.log("Selected Images in OrderSummary:", selectedImages); // Add this line to log selectedImages
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, ml: 78 }}>Order Summary:</Typography>
      {/* Add order summary items here */}
      <Stack
        direction="column"
        sx={{
          p: 2,
          position: 'fixed',
          bottom: '20px', // Adjust this value to move the Stack up or down
          left: '65%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '600px', // Adjust the maximum width of the Stack
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Cart Total: {cartTotal} xp</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Points After Purchase: {points - cartTotal} xp</Typography>
        <Stack direction="row">
          <Button 
            component={Link} 
            to="/avatar"
            variant="contained" 
            color="primary" 
            sx={{ mb: 2 }}
            onClick={() => handleBuy()}>
            Buy
          </Button>
          <Button component={Link} to="/avatar_status" variant="contained" color="error" sx={{ mb: 2 }}>
            Back
          </Button>
        </Stack>
      </Stack>

      {/* Mini grid to display selected images */}
      <Grid container spacing={2} justifyContent="center"> {/* Center the grid */}
        {selectedImages.map((image, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: 150 }}>
              <CardMedia
                component="img"
                image={image.src}
                alt={`Selected Image ${index}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default OrderSummary;