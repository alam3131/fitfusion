import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Profile = () => {
  // State for personal information
  const [personalInfo, setPersonalInfo] = useState({
    gender: '',
    height: '',
    weight: '',
    fitnessLevel: '',
  });

  // State for fitness goals
  const [fitnessGoals, setFitnessGoals] = useState({
    targetWeight: '',
    exerciseDaysPerWeek: '',
    stepCount: '',
    caloriesBurned: '',
  });

  useEffect(() => {
    const savedPersonalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    const savedFitnessGoals = JSON.parse(localStorage.getItem('fitnessGoals'));
    if (savedPersonalInfo) {
      setPersonalInfo(savedPersonalInfo);
    }
    if (savedFitnessGoals) {
      setFitnessGoals(savedFitnessGoals);
    }
  }, []);

  // Handle changes in personal information fields
  const handlePersonalInfoChange = (event) => {
    setPersonalInfo({
      ...personalInfo,
      [event.target.name]: event.target.value,
    });
  };

  // Handle changes in fitness goals fields
  const handleFitnessGoalsChange = (event) => {
    setFitnessGoals({
      ...fitnessGoals,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Save data to localStorage
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    localStorage.setItem('fitnessGoals', JSON.stringify(fitnessGoals));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Personal Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Gender"
          name="gender"
          value={personalInfo.gender}
          onChange={handlePersonalInfoChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height (cm)"
          name="height"
          value={personalInfo.height}
          onChange={handlePersonalInfoChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Weight (kg)"
          name="weight"
          value={personalInfo.weight}
          onChange={handlePersonalInfoChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Fitness Level"
          name="fitnessLevel"
          value={personalInfo.fitnessLevel}
          onChange={handlePersonalInfoChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Fitness Goals
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Target Weight (kg)"
          name="targetWeight"
          value={fitnessGoals.targetWeight}
          onChange={handleFitnessGoalsChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Exercise Days per Week"
          name="exerciseDaysPerWeek"
          value={fitnessGoals.exerciseDaysPerWeek}
          onChange={handleFitnessGoalsChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Step Count"
          name="stepCount"
          value={fitnessGoals.stepCount}
          onChange={handleFitnessGoalsChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Calories Burned per Day"
          name="caloriesBurned"
          value={fitnessGoals.caloriesBurned}
          onChange={handleFitnessGoalsChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;