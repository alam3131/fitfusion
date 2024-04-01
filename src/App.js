import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Avatar from './pages/Avatar';
import AvatarStatus from './pages/AvatarStatus';
import OrderSummary from './pages/OrderSummary';


const App = () => {
  return (
    <Box width="400px" sx={{ width: { x1: '1488px'}}} m="auto">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/avatar_status" element={<AvatarStatus/>} />
            <Route path="/order_summary" element={<OrderSummary/>} />
        </Routes>
    </Box>
  )
}

export default App