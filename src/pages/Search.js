import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';

const SearchExcercises = () => {
  const [search, setSearch] = useState('');
  const [excercises,setExcercises] = useState([]);
  // const [excercises,setExcercises] = useState([])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
      const searchedExercises = exercisesData.filter(
        item => item.WorkOut.toLowerCase().includes(search)||item.Muscles.toLowerCase().includes(search) ,);
      console.log(searchedExercises);
      setSearch('');
      setExcercises(searchedExercises);
    }

  }
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
      Awesome Exercises For <br /> You
    </Typography>
    <Box position="relative" mb="72px">
      <TextField
        height="76px"
        sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Exercises"
        type="text"
      />
      <Button className="search-btn" sx={{ bgcolor: '#128731', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
        Search
      </Button>
    </Box>
    <Stack spacing={2}>
        {excercises.map((exercise, index) => (
          <Box key={index} bgcolor="#f0f0f0" p={2} borderRadius={4}>
            <Typography variant="h6">{exercise.WorkOut}</Typography>
            <Typography variant="body1">Muscles: {exercise.Muscles}</Typography>
            
          </Box>
        ))}
      </Stack>

  </Stack>
);
};


export default SearchExcercises
