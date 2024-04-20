import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Stats from '../components/Stats';
import WeeklyPointsGrid from '../components/WeeklyPoints';

const Home = ({ todayPoints, pointsThisWeek, setPointsThisWeek, points, weeklyExercises, activeStreak, setActiveStreak }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [lastLoggedDate, setLastLoggedDate] = useState(null);
  const [updateExercises, setUpdateExercises] = useState(0);
  const [updatePoints, setUpdatePoints] = useState(points);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load buttonDisabled status from localStorage on component mount
    const storedButtonDisabled = localStorage.getItem('buttonDisabled');
    if (storedButtonDisabled) {
      setButtonDisabled(JSON.parse(storedButtonDisabled));
    }
  }, []);

  const advanceDate = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handleButtonClick = () => {
    setButtonDisabled(true);
    setLastLoggedDate(new Date());
    setUpdatePoints(updatePoints + todayPoints);
    setUpdateExercises(updateExercises + weeklyExercises);
    setActiveStreak(activeStreak + 1);
  };

  useEffect(() => {
    // Save buttonDisabled status to localStorage whenever it changes
    localStorage.setItem('buttonDisabled', JSON.stringify(buttonDisabled));
  }, [buttonDisabled]);

  useEffect(() => {
    const currentDate = new Date();
    if (lastLoggedDate && lastLoggedDate.toDateString() !== currentDate.toDateString()) {
      setActiveStreak(0);
      setLastLoggedDate(currentDate);
    }
  }, [lastLoggedDate, setActiveStreak, todayPoints, weeklyExercises]);

  useEffect(() => {
    localStorage.setItem('updateExercises', updateExercises.toString());
    localStorage.setItem('updatePoints', updatePoints.toString());
  }, [updateExercises, updatePoints]);

  useEffect(() => {
    setButtonDisabled(false);
  }, [currentDate]);

  return (
    <Box>
      <Stats points={points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} updateExercises={updateExercises} updatePoints={updatePoints} />
      <WeeklyPointsGrid pointsData={pointsThisWeek} setPointsThisWeek={setPointsThisWeek} />
      <Button variant="contained" onClick={handleButtonClick} disabled={buttonDisabled}>
        Log Workout
      </Button>
      <Button onClick={advanceDate}>Advance Date</Button>
    </Box>
  );
}

export default Home;
