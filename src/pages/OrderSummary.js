import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material'

const OrderSummary = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, ml: 78}}>Order Summary:</Typography>
      {/* Add order summary items here */}
      <Stack direction="column"       
        sx={{
          p: 2,
          position: 'fixed',
          bottom: '20px', // Adjust this value to move the Stack up or down
          left: '65%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '600px', // Adjust the maximum width of the Stack>
        }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Total: 1400 xp</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Point Left After: 1600xp</Typography>
        <Stack direction="row">
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Buy
          </Button>
          <Button component={Link} to="/avatar_status" variant="contained" color="error" sx={{ mb: 2 }}>
            Back
          </Button>
        </Stack>
      </Stack>
      
      
    </Box>
  );
}

export default OrderSummary