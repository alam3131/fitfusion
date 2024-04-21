import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Stats from '../components/Stats';
import WeeklyPointsGrid from '../components/WeeklyPoints';
import moment from 'moment';

const Home = ({ todayPoints, pointsThisWeek, setPointsThisWeek, points, weeklyExercises, activeStreak, setActiveStreak, buttonDisabled, setButtonDisabled }) => {
  const [lastLoggedDate, setLastLoggedDate] = useState(null);
  const [updateExercises, setUpdateExercises] = useState(0);
  const [updatePoints, setUpdatePoints] = useState(points);
  const [currentDate, setCurrentDate] = useState(moment().format('dddd'));

  const handleButtonClick = () => {
    setButtonDisabled(true);
    setLastLoggedDate(moment().format('dddd'));
    // alert("New Date: " + moment().format('dddd'))
    setUpdatePoints(updatePoints + todayPoints);
    setUpdateExercises(updateExercises + weeklyExercises);
    setActiveStreak(activeStreak + 1);
  };

  const handleTempButton = () => {
    const today = moment().day(0);
    setCurrentDate(moment(today).subtract(1, 'days'));
  };


  useEffect(() => {
    // alert("Current date in useeffect: " + currentDate);
    if (lastLoggedDate && lastLoggedDate !== currentDate) {
      setActiveStreak(0);
      setLastLoggedDate(currentDate);
    }
  }, [lastLoggedDate]);

  useEffect(() => {
    localStorage.setItem('updateExercises', updateExercises.toString());
    localStorage.setItem('updatePoints', updatePoints.toString());
  }, [updateExercises, updatePoints]);

  useEffect(() => {
    if (currentDate !== moment().format('dddd')) {
      setButtonDisabled(false);
    }
  }, [currentDate]);

  return (
    <Box>
      <Stats points={points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} updateExercises={updateExercises} updatePoints={updatePoints} />
      <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek} />
      <Button variant="contained" sx={{ mt: 25, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleButtonClick} disabled={buttonDisabled}>
        Log Workout
      </Button>
      <Button sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleTempButton}>Change current Date button</Button> 
    </Box>
  );
}

export default Home;
