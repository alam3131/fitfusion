import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material'
import {exerciseOptions,fetchData, youtubeOptions} from '../utils/fetchData';
import ExcerciseVideo from '../components/ExcerciseVideo';
import {Typography, Stack, Button} from '@mui/material';
import { useLocation } from 'react-router-dom';

const ExcerciseDetail = () => {
  const [exerciseDetail, setExcerciseDetail] =useState({});
  const [exerciseVideo, setExcerciseVideo] =useState([]);
  const{WorkOut} = useParams();
  const location = useLocation();
  const exercise = location.state;
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
    // <div>
    //   <h2>{exercise.WorkOut}</h2>
    //   <p>Muscles: {exercise.Muscles}</p>
    //   <p>Level: {exercise.Intensity_Level}</p>
    //  <p> {exercise.Explaination} </p>
    //   {/* <p>Points: {getPointsForLevel(exercise.Intensity_Level)}</p> */}
    // </div>
    // <Box>
    //   <ExcerciseVideo/>
    // </Box>
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
    </Stack>
  )
}

export default ExcerciseDetail
 