import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const OrderSummary = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Order Summary:</Typography>
      {/* Add order summary items here */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Total: 1400 xp</Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Point Left After: 1600xp</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Buy
      </Button>
      <Button variant="contained" color="secondary">
        Back
      </Button>
    </Box>
  );
}

export default OrderSummary