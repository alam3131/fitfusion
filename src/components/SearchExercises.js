import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const SearchExcercises = () => {
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
    <Box position="relative" ml="0px" mb="-20px">
      <TextField
        height="70px"
        sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '500px', xs: '175px' }, backgroundColor: '#fff', borderRadius: '40px' }}

        placeholder="Search Exercises"
        type="text"
      />
      <Button className="search-btn" sx={{ bgcolor: '#128731', '&:hover': {bgcolor: '#128731'}, color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} >
        Search
      </Button>
    </Box>
    {/* sx={{ bgcolor: '#128731', '&:hover': {bgcolor: '#128731'} */}
    {/* .search-btn:hover {
    color: #FF2625 !important;
    border: 1px solid #FF2625 !important;
    background-color:#fff; */}
  }

  </Stack>
);
};


export default SearchExcercises