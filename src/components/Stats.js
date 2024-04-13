import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Stats = () => {
  // These values can also come from props or state
  const stats = [
    { key: 'calories', label: 'Calories', value: '456 kcal', color: '#2CE12C'},
    { key: 'time', label: 'Time', value: '2:05 Min', color: '#3399FF'},
    { key: 'distance', label: 'Distance', value: '3.25 Mile', color: '#FF6666'}
  ];

  return (
    <Box className="home-container" mt={5} sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      </Box>
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
        Points Earned Each Day
      </Typography>
    </Box>
  );
}

export default Stats;
  