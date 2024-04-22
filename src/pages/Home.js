import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Stats from '../components/Stats';
import SearchExercises from '../components/SearchExercises';
import WeeklyPointsGrid from '../components/WeeklyPoints';
import moment from 'moment';


const Home = ({ todayPoints, pointsThisWeek, setPointsThisWeek, points, updatePoints, tentativePoints, weeklyExercises, activeStreak, setActiveStreak, buttonDisabled, setButtonDisabled, todaysWorkouts, setActiveTab, updatePointsForDay}) => {
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
    const newPoints = points + Number(tentativePoints); // Example: User earns 10 points
    // alert("number of points:" + tentativePoints);
    updatePoints(newPoints);
    const dayOfWeek = moment().format('dddd');
    updatePointsForDay(dayOfWeek, Number(tentativePoints));
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // alert("Workout:" + JSON.stringify(todaysWorkouts));
  };

  return (
    <Box>
      <Stats points={points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} updateExercises={updateExercises} />
      <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek} />
      <Paper sx={{ width: '40%', border: '2px solid #ddd', borderRadius: '5px', padding: '10px', marginTop: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center', marginRight: '10px' }}>Today's Workouts:</Typography>
        </Box>
        {todaysWorkouts.map((workout, index) => (
          <Typography key={index} sx={{ marginBottom: '5px', textAlign: 'center' }}>{workout.title}</Typography>
        ))}
      </Paper>
      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Button variant="contained" sx={{ mt: 2, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleButtonClick} disabled={buttonDisabled}>
          Log Workouts
        </Button>
        <Button component={Link} to="/search" onClick={() => handleTabClick('Search')} variant="contained" sx={{ mt: 2, mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}}>
          Add Workouts
        </Button>
      </Stack>

      {/* <Button sx={{ mx: 'auto', display: 'block', width: '150px', textAlign: 'center'}} onClick={handleTempButton}>Change current Date button</Button>  */}
    </Box>
  );
}

export default Home;
