import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material'
import {exerciseOptions,fetchData, youtubeOptions} from '../utils/fetchData';
import ExcerciseVideo from '../components/ExcerciseVideo';
import {Typography, Stack, Button} from '@mui/material';
import { useLocation } from 'react-router-dom';

const ExcerciseDetail = ({setWorkoutsToCalender, workoutsToCalender}) => {
  const [exerciseDetail, setExcerciseDetail] =useState({});
  const [exerciseVideo, setExcerciseVideo] =useState([]);
  const{WorkOut} = useParams();
  const location = useLocation();
  const exercise = location.state;
  const handleAddToWorkoutPlan = (exercise) => {
    console.log(`Adding "${exercise.WorkOut}" to workout plan`);
    // add new workout to calender 
    const formattedEvent = {
      title: exercise.WorkOut,
      start: new Date(), // You can set the start date and time here
      end: new Date(), // You can set the end date and time here
    };
    setWorkoutsToCalender([...workoutsToCalender,formattedEvent]);
  };
  useEffect(() => {
    const fetchExcerciseData = async () => {
      //const excerciseDBUrl = 'https://work-out-api1.p.rapidapi.com/search';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      //const excersieDetailData = await fetchData( 'https://work-out-api1.p.rapidapi.com/search',exerciseOptions);
      //const filteredExercises = excersieDetailData.filter(item => item.Muscles.toLowerCase().includes(WorkOut.toLowerCase()));
      console.log({WorkOut});
      // setExcerciseDetail(excerciseDetailData);
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exercise.WorkOut} exercise`, youtubeOptions);
      setExcerciseVideo(exerciseVideosData.contents);
    }
    fetchExcerciseData();
  }, [WorkOut])

  if(!exerciseVideo.length) return 'Loading...';
  return (
    <Stack gap="60px" sx={{flexDirection: {lg:'row'}, p:'20px', alignItems:'center'}}>
      {exerciseVideo?.slice(0, 1)?.map((item, index) => (
        <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${item.video.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      ))}
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '40px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
        <div><h2>{exercise.WorkOut}</h2></div>
        </Typography>
        <Typography sx={{ fontSize: { lg: '20px', xs: '18px' } }} color="#4F4C4C">
          <div><p> {exercise['Long Explanation']} </p></div>
        </Typography>
        <Stack direction="row" gap="24px" alignItems="center">
          <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
          <div>
            <p>{exercise.Muscles}</p>
          </div>
          </Button>
          <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
            <div>
            <p> {exercise.Intensity_Level}</p>
            </div>
          </Button>
          <Button  className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff'}} onClick={() => handleAddToWorkoutPlan(exercise)}>Add to Calendar</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ExcerciseDetail
 