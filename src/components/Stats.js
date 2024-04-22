import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Stats = ({activeStreak, points, weeklyExercises, updateExercises, updatePoints}) => {
  // New statistics to show more user engagement and achievements
  const stats = [
    { key: 'totalPoints', label: 'Total Points', value: points, color: '#FFD700' }, // Gold color for a premium feel
    { key: 'exercisesCompleted', label: 'Total Exercises Completed', value: updateExercises, color: '#0088FE' }, // Bright blue for a calm, trustworthy feel
    { key: 'activeStreak', label: 'Active Streak', value: activeStreak, color: '#32CD32' } // Lime green for energy and growth
  ];

  return (
    <Box className="home-container" mt={5} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.key}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2, backgroundColor: stat.color }}>
              <CardContent>
                <Typography color="white" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography color="white" variant="h5" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Stats;


