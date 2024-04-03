import React, { useEffect, useState } from 'react';
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
import Search from './pages/Search';


const App = () => {
  useEffect(() => {
    document.title = "Fitfusion"; // Set the new title
  }, []);

  const [activeTab, setActiveTab] = useState('Home');
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Load selectedAvatar from localStorage on component mount
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  useEffect(() => {
    // Save selectedAvatar to localStorage on change
    if (selectedAvatar) {
      localStorage.setItem('selectedAvatar', selectedAvatar);
    }
  }, [selectedAvatar]);


  return (
    <Box width="400px" sx={{ width: { x1: '1488px'}}} m="auto">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} selectedAvatar={selectedAvatar}/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/avatar" element={<Avatar selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />} />
            <Route path="/avatar_status" element={<AvatarStatus selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>} />
            <Route path="/order_summary" element={<OrderSummary selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>} />
        </Routes>
    </Box>
  )
}

export default App