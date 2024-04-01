import React, { useState } from 'react'
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  return (
    <Box>
        <Stats />
    </Box>
  )
}

export default Home