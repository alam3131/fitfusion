import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { Box, Button, FormControl, MenuItem, Select, Typography, Paper } from '@mui/material';

const localizer = momentLocalizer(moment);

const muscleGroups = [
  'Biceps', 'Triceps', 'Chest', 'Legs', 'Abs', 'Stretching',
  'Warm Up', 'Lats', 'Hamstring', 'Calves',
  'Quadriceps', 'Trapezius', 'Shoulders', 'Glutes'
];

const MyCalendar = ({ setWorkoutsToCalender, workoutsToCalender, setWeeklyExercises }) => {
  const [currentView, setCurrentView] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  
  const isInCurrentDay = (date) => {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');
    return moment(date).isBetween(startOfDay, endOfDay, null, '[]');
  };

  useEffect(() => { 
    // Filter exercises that fall within the current week
    const filteredExercises = workoutsToCalender.filter(event => isInCurrentDay(event.start));
    
    // Calculate the total number of exercises in the current week
    const totalExercisesInWeek = filteredExercises.length;
    
    // Update the state with the total exercises for the week
    setWeeklyExercises(totalExercisesInWeek);
  }, [workoutsToCalender]);
  

  useEffect(() => {
    const storedView = localStorage.getItem('currentView');
    if (storedView) {
      setCurrentView(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const handleEventClick = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      const updatedEvents = workoutsToCalender.filter((e) => !areEventsEqual(e, event));
      setWorkoutsToCalender(updatedEvents);
    }
  };

  const handleView = (view) => {
    setCurrentView(view);
  };

  const handleDateSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const handleMuscleGroupClick = async (muscle) => {
    setSelectedMuscle(muscle);
    const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
    const filteredExercises = exercisesData.filter(item => item.Muscles.toLowerCase().includes(muscle.toLowerCase()));
    setExercises(filteredExercises);
  };

  const handleAddToWorkoutPlan = (exercise) => {
    const formattedEvent = {
      title: exercise.WorkOut,
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hours').toDate()  // Assuming 1-hour duration
    };
    setWorkoutsToCalender([...workoutsToCalender, formattedEvent]);
  };

  const areEventsEqual = (event1, event2) => {
    return moment(event1.start).isSame(event2.start, 'day') &&
      moment(event1.end).isSame(event2.end, 'day') &&
      event1.title === event2.title;
  };

  const dayPropGetter = (date) => {
    return {
      style: {
        backgroundColor: moment(date).isSame(selectedDate, 'day') ? '#c8e6c9' : 'white', // Highlight the selected date
      }
    };
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>
        {`
          .rbc-agenda-time-cell, .rbc-agenda-time-header {
            display: none;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={workoutsToCalender}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: '70%' }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleDateSelect}
        selectable
        views={['month', 'agenda']}
        onView={handleView}
        dayPropGetter={dayPropGetter}
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <Select
          value={selectedMuscle}
          onChange={(e) => handleMuscleGroupClick(e.target.value)}
          displayEmpty
          sx={{ bgcolor: 'green', color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
        >
          <MenuItem value="" disabled>Select Muscle Group</MenuItem>
          {muscleGroups.map((muscle, index) => (
            <MenuItem key={index} value={muscle}>{muscle}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {exercises.map((exercise, index) => (
        <Paper key={index} sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, m: 1,
          bgcolor: 'background.paper', borderRadius: 2, width: '100%'
        }}>
          <Typography>{exercise.WorkOut} - {exercise.Muscles}</Typography>
          <Button variant="contained" sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }} onClick={() => handleAddToWorkoutPlan(exercise)}>
            Add to Calendar
          </Button>
        </Paper>
      ))}
    </div>
  );
};

export default MyCalendar;


