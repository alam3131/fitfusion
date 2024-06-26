import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { Link } from 'react-router-dom'; 
import Pagination from '@mui/material/Pagination';

const muscleGroups = [
  'Biceps', 'Triceps', 'Chest', 'Legs', 'Abs', 'Stretching', 
  'Warm Up', 'Lats', 'Hamstring', 'Calves',
  'Quadriceps', 'Trapezius', 'Shoulders', 'Glutes'
];

const levelGroups =['Beginner','Intermediate','Expert'];

// Function to calculate points based on level
const getPointsForLevel = (level) => {
  switch (level) {
    case 'Beginner':
      return 100;
    case 'Intermediate':
      return 200;
    case 'Expert':
      return 300;
    default:
      return 0;
  }
}; //******************************************* */

const SearchExcercises = ({ earnPoints, points, setWorkoutsToCalender, workoutsToCalender }) => {
  const [search, setSearch] = useState('');
  const [excercises,setExcercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedLevel, setLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  const handleLevelAndMuscleFilter = async () => {
    if (selectedMuscle && selectedLevel) {
      const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
      const filteredExercises = exercisesData.filter(
        item => item.Muscles.toLowerCase().includes(selectedMuscle.toLowerCase()) &&
                item.Intensity_Level.toLowerCase().includes(selectedLevel.toLowerCase())
      );
      setExcercises(filteredExercises);
    } else if (selectedMuscle) {
      handleMuscleGroupClick(selectedMuscle);
    } else if (selectedLevel) {
      handleLevelGroupClick(selectedLevel);
    }
  };

  const handleLevelGroupClick = async (Level) => {
    setLevel(Level); 
    const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
    const filteredByLevel = exercisesData.filter(item => item.Intensity_Level.toLowerCase().includes(Level.toLowerCase()));
    setExcercises(filteredByLevel);
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = excercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  const handleMuscleGroupClick = async (muscle) => {
    setSelectedMuscle(muscle); 
    const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
    const filteredExercises = exercisesData.filter(item => item.Muscles.toLowerCase().includes(muscle.toLowerCase()));
    setExcercises(filteredExercises);
  };

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://work-out-api1.p.rapidapi.com/search', exerciseOptions);
      const searchedExercises = exercisesData.filter(
        item => item.WorkOut.toLowerCase().includes(search)||item.Muscles.toLowerCase().includes(search)|| item.Intensity_Level.toLowerCase().includes(search) 
        || (item['Long Explanation'].toLowerCase().includes(search)),);
      setSearch('');
      console.log(exercisesData);
      setExcercises(searchedExercises);
    }
  }

  const handleExcerciseClick = (exercise) => {
    // earnPoints(Number(getPointsForLevel(exercise.Intensity_Level)));
    // alert("Muscle Groups" + JSON.stringify(currentExercises));
  }; //****************************************** */
  
  useEffect(() => {
    handleLevelAndMuscleFilter();
  }, [selectedMuscle, selectedLevel]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px" spacing={4}>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises For <br /> You
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '550px', xs: '250px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value = {search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn" sx={{ bgcolor: '#128731', color: '#fff', textTransform: 'none', height: '56px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
          Search
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
      <FormControl sx={{ width: '200px',bgcolor: '#128731', borderRadius: '4px', fontSize: { lg: '20px', xs: '14px' } }}> 
        <Select className="search-btn"
          sx={{color: '#fff', fontSize: { lg: '20px', xs: '14px' }, height: '56px'}}
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          displayEmpty
           // Customize scrollbar width bgcolor: '#128731' sx={{ color: '#FFFFFF' }
        >
        <MenuItem value="" disabled >
          Muscle Group
        </MenuItem>
        {muscleGroups.map((muscle, index) => (
          <MenuItem key={index} value={muscle}>{muscle}</MenuItem>
        ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '250px',bgcolor: '#128731', borderRadius: '4px', fontSize: { lg: '20px', xs: '14px' }}}> 
        <Select className="search-btn"
          sx={{color: '#fff', fontSize: { lg: '20px', xs: '14px' }, height: '56px'}}
          value={selectedLevel}
          onChange={(e) => setLevel(e.target.value)}
          displayEmpty
           // Customize scrollbar width bgcolor: '#128731' sx={{ color: '#FFFFFF' }
        >
        <MenuItem value="" disabled >
          Experience Level
        </MenuItem>
        {levelGroups.map((level, index) => (
          <MenuItem key={index} value={level}>{level}</MenuItem>
        ))}
        </Select>
      </FormControl>
        
      </Stack>
      <Stack spacing={2} flexWrap="wrap" justifyContent="center">
  {currentExercises.length > 0 ? (
    currentExercises.map((exercise, index) => (
      <Button 
        key={index} 
        onClick={() => handleExcerciseClick(exercise)} 
        variant="contained" 
        sx={{ 
          bgcolor: '#128731',
          color: '#fff', // White text color
          borderRadius: 4, 
          textAlign: 'center',
          mt: 25,
          mx: 'auto',
          display: 'block',
          width: '300px',
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'transparent', // Transparent background color on hover
            borderColor: 'red', // Red border color on hover
            '& > .MuiBox-root': {
              color: 'red', // Change text color of the box to red on hover
              borderColor: 'red', // Change border color of the box to red on hover
            }
          }
        }}
      >
        <Box p={2} borderRadius={4} sx={{ color: '#fff' }}>
          <Typography variant="h6">{exercise.WorkOut}</Typography>
          <Typography variant="body1">Muscles: {exercise.Muscles}</Typography>
          <Typography variant="body2">Level: {exercise.Intensity_Level}</Typography>
          <Typography variant="body2">Points: {getPointsForLevel(exercise.Intensity_Level)}</Typography>
          <Link to={`/search/${exercise.WorkOut}`} state={exercise}>
            <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff'}}>View Details</Button>
          </Link>
        </Box>
      </Button>
    ))
  ) :  (
    <Typography >No results found...</Typography>
  )}
</Stack>

      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {excercises.length > 9 && (
        <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(excercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Stack>
  );
};

export default SearchExcercises;
