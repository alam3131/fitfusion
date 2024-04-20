import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material';

import Exercises from '../components/Exercises';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import WeeklyPointsGrid from '../components/WeeklyPoints';

const Home = ({ todayPoints, pointsThisWeek, setPointsThisWeek, points, weeklyExercises, activeStreak, setActiveStreak }) => {
  const [buttonPressed, setButtonPressed] = useState(false); // State variable to track if button is pressed
  const [updateExercises, setUpdateExercises] = useState(0);
  const [updatePoints, setUpdatePoints] = useState(0);

  // Function to handle button click
  const handleButtonClick = () => {
    // Set buttonPressed to true when the button is clicked
    setButtonPressed(true);
  };

  useEffect(() => {
    if(buttonPressed){
      setUpdatePoints(updatePoints + todayPoints);
      setUpdateExercises(updateExercises + weeklyExercises);
      setActiveStreak(activeStreak+1);
      setButtonPressed(false);
    }
  }, [buttonPressed, setActiveStreak, activeStreak, weeklyExercises]);


  return (
    <Box>
          <Stats points = {points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} updateExercises={updateExercises} updatePoints={updatePoints}/>
        <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek}/>
        <Button variant="contained" onClick={handleButtonClick}>
          Log Workout
        </Button>
    </Box>
  )
}

export default Home