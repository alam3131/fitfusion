import React, { useState } from 'react'
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import WeeklyPointsGrid from '../components/WeeklyPoints';

const pointsData = [100, 150, 80, 200, 120, 90, 160];

const Home = () => {
  return (
    <Box>
        <Stats />
        <WeeklyPointsGrid pointsData={pointsData} />
    </Box>
  )
}

export default Home