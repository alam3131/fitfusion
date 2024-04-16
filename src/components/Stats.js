import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Stats = () => {
  // New statistics to show more user engagement and achievements
  const stats = [
    { key: 'totalPoints', label: 'Total Points', value: '1200', color: '#FFD700' }, // Gold color for a premium feel
    { key: 'exercisesCompleted', label: 'Exercises Completed', value: '250', color: '#0088FE' }, // Bright blue for a calm, trustworthy feel
    { key: 'activeStreak', label: 'Active Streak', value: '14 Days', color: '#32CD32' } // Lime green for energy and growth
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
      <Typography variant="subtitle1" sx={{ mt: 3, textAlign: 'center' }}>
        Keep up the great work! Every exercise counts towards your goals.
      </Typography>
    </Box>
  );
}

export default Stats;


