import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material'
import {exerciseOptions,fetchData, youtubeOptions} from '../utils/fetchData';
import {Typography, Stack, Button} from '@mui/material';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const ExcerciseDetail = ({setWorkoutsToCalender, workoutsToCalender, tentativePoints, setTentativePoints, getPointsForLevel}) => {
  const [exerciseDetail, setExcerciseDetail] =useState({});
  const [exerciseVideo, setExcerciseVideo] =useState([]);
  const{WorkOut} = useParams();
  const location = useLocation();
  const exercise = location.state;
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const handleAddToWorkoutPlan = (exercise) => {
    console.log(`Adding "${exercise.WorkOut}" to workout plan`);
    // Convert input values to numbers
    const desiredDay = parseInt(day, 10);
    const desiredMonth = parseInt(month, 10);
    // Validate input
    if (isNaN(desiredDay) || isNaN(desiredMonth)) {
      alert('Please enter valid day and month values.');
      return;
    }
    // Validate the day and month combination for a valid date
    if (desiredMonth < 1 || desiredMonth > 12) {
      alert('Please enter a valid month (1-12).');
      return;
    }
    // Validate the day against the maximum number of days in the month
    const maxDaysInMonth = new Date(new Date().getFullYear(), desiredMonth, 0).getDate();
    if (desiredDay < 1 || desiredDay > maxDaysInMonth) {
      alert(`Please enter a valid day for the selected month (1-${maxDaysInMonth}).`);
      return;
    }
    // Create a new Date object with the user input
    const startDate = new Date();
    startDate.setDate(desiredDay);
    startDate.setMonth(desiredMonth - 1); // Months are zero-indexed
    // Assuming the workout lasts for 1 hour
    const endDate = new Date(startDate.getTime());
    endDate.setHours(endDate.getHours());
    // add new workout to calendar 
    const formattedEvent = {
      title: exercise.WorkOut,
      Intensity_Level: exercise.Intensity_Level,
      start: startDate,
      end: endDate,
    };
    setWorkoutsToCalender([...workoutsToCalender,formattedEvent]);
    const newPoints = tentativePoints + Number(getPointsForLevel(exercise.Intensity_Level)); // Example: User earns 10 points
    setTentativePoints(newPoints);
  };

 
  useEffect(() => {
    const fetchExcerciseData = async () => {

      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      //const excersieDetailData = await fetchData( 'https://work-out-api1.p.rapidapi.com/search',exerciseOptions);
      //const filteredExercises = excersieDetailData.filter(item => item.Muscles.toLowerCase().includes(WorkOut.toLowerCase()));
      console.log({WorkOut});
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exercise.WorkOut} exercise`, youtubeOptions);
      setExcerciseVideo(exerciseVideosData.contents);
    }
    fetchExcerciseData();
  }, [WorkOut])

  if(!exerciseVideo.length) return 'Loading...';
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px" gap="30px" spacing={2} sx={{ p:'20px', alignItems:'center', marginTop: '40px'}}>
      <Stack gap="24px" alignItems="center" direction="row" justifyContent="center">
        <Typography sx={{ fontSize: { lg: '45px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          <div><h2>{exercise.WorkOut}</h2></div>
          </Typography>
          <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '140px', height: '50px' }}>
            <div><p>{exercise.Muscles}</p></div>
            </Button>
          <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '140px', height: '50px' }}>
            <div><p>{exercise.Intensity_Level}</p></div>
            </Button>
      </Stack>
      <Stack direction="row" gap="50px" alignItems="center">
        {exerciseVideo?.slice(0, 1)?.map((item, index) => (
        <div>
          <iframe
          width="660"
          height="415"
          src={`https://www.youtube.com/embed/${item.video.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="true"
          ></iframe>
        </div>
        ))}
        <Stack gap="30px">
          <Box>
          <Typography sx={{ fontSize: { lg: '20px', xs: '30px' } }} fontWeight={600}>Description:</Typography>
          <Typography sx={{ fontSize: { lg: '20px', xs: '18px' } , width: '650px' }} color="#4F4C4C" >
            <div><p> {exercise['Long Explanation']} </p></div>
          </Typography>
          </Box>
          <Stack direction="row" gap="5px" alignItems="center" >
            <TextField label="Enter Day" type="number" value={day} onChange={(e) => setDay(e.target.value)} style={{ padding: '5px' }} />
            <TextField label="Enter Month" type="number" value={month} onChange={(e) => setMonth(e.target.value)} style={{ padding: '5px' }}/>
            <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff'}} style={{ padding: '10px' }}
              onClick={() => handleAddToWorkoutPlan(exercise)}>
              Add to Calendar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ExcerciseDetail
 