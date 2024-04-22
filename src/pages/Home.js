import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import WeeklyPointsGrid from '../components/WeeklyPoints';
import moment from 'moment';


const Home = ({ todayPoints, pointsThisWeek, setPointsThisWeek, points, weeklyExercises, activeStreak, setActiveStreak, buttonDisabled, setButtonDisabled, todaysWorkouts}) => {
  const [lastLoggedDate, setLastLoggedDate] = useState(null);
  const [updateExercises, setUpdateExercises] = useState(0);
  // const [updatePoints, setUpdatePoints] = useState(points);
  const [currentDate, setCurrentDate] = useState(moment().format('dddd'));

  const handleButtonClick = () => {
    setButtonDisabled(true);
    setLastLoggedDate(moment().format('dddd'));
    // alert("New Date: " + moment().format('dddd'))
    // setUpdatePoints(points + todayPoints);
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
    localStorage.setItem('updatePoints', points.toString());
  }, [updateExercises, points]);

  useEffect(() => {
    if (currentDate !== moment().format('dddd')) {
      setButtonDisabled(false);
    }
  }, [currentDate]);

  return (
    <Box>
      <Stats points={points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} updateExercises={updateExercises} />
      <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek} />
      <Paper sx={{ border: '2px solid #ddd', borderRadius: '5px', padding: '10px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center', marginRight: '10px' }}>Today's Workouts:</Typography>
    <Link component={Button} to="/search" variant="contained" sx={{ mt: 'auto', display: 'block', width: '150px', textAlign: 'center' }}>
            Add More
          </Link>
  </Box>
  {todaysWorkouts.map((workout, index) => (
    <Typography key={index} sx={{ marginBottom: '5px', textAlign: 'center' }}>{workout.title}</Typography>
  ))}
</Paper>

      <Button variant="contained" sx={{ mt: 2, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleButtonClick} disabled={buttonDisabled}>
        Log Workout
      </Button>
      <Button sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleTempButton}>Change current Date button</Button> 
    </Box>
  );
}

export default Home;
