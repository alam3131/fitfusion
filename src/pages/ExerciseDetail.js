import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material'
import {excerciseOptions,fetchData} from '../utils/fetchData';
import ExcerciseVideo from '../components/ExcerciseVideo';


const ExcerciseDetail = () => {
  return (
    <Box>
      <ExcerciseVideo/>
    </Box>
  )
}

export default ExcerciseDetail
 