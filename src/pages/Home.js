import React, { useState } from 'react'
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import WeeklyPointsGrid from '../components/WeeklyPoints';

const Home = ({ pointsThisWeek, setPointsThisWeek, points, weeklyExercises }) => {
  return (
    <Box>
        <Stats points = {points} weeklyExercises={weeklyExercises}/>
        <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek}/>
    </Box>
  )
}

export default Home