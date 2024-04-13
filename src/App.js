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

import Deadpool from './assets/images/deadpool_avatar.png';
import Harley from './assets/images/harley_quinn.png';
import Joker from './assets/images/joker.png';
import Batgirl from './assets/images/batgirl.png';
import Venom from './assets/images/venom.png';
import Thanos from './assets/images/thanos_avatar.png';
import Antman from './assets/images/antman.png';

const avatars = [
  { name: 'Harley Quinn', src: Harley, xp: 500 },
  { name: 'Joker', src: Joker, xp: 500},
  { name: 'Batgirl', src: Batgirl, xp: 500 },
  { name: 'Venom', src: Venom, xp: 500 },
  { name: 'Thanos', src: Thanos, xp: 500},
  { name: 'Antman', src: Antman, xp: 500},
];

const App = () => {
  useEffect(() => {
    document.title = "Fitfusion"; // Set the new title
  }, []);

  const [activeTab, setActiveTab] = useState('Home'); // Sets the tab of which is currently active from navbar
  const [selectedAvatar, setSelectedAvatar] = useState(); // The avatar for profile 
  const [selectedImages, setSelectedImages] = useState([]); // The array of images that are selected in shop
  const [points, setPoints] = useState(0); // State variable to save the points the user has
  const [inventory, setInventory] = useState([]); // The array of avatars in your inventory
  const [shopItems, setShopItems] = useState([]); // The array of avatars in the shop

  // Hooks to store selected avatar in local storage
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

  // Hooks to store inventory in local storage
  useEffect(() => {
    // Check if inventory is already stored in localStorage
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      // Parse the stored string back into an array
      setInventory(JSON.parse(storedInventory));
      // setInventory([{ name: 'Deadpool', src: Deadpool, xp: 0 }]);
    } else {
      // If inventory is not stored, set it to the avatars array
      setInventory([{ name: 'Deadpool', src: Deadpool, xp: 0 }]);
    }
  }, []);

  useEffect(() => {
    // Stringify the inventory array before storing it in localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Hooks to store shop items in local storage
  useEffect(() => {
    // Load shop items from localStorage on component mount
    const savedShopItems = localStorage.getItem('shopItems');
    if (savedShopItems) {
      // Parse the stored string back into an array
      setShopItems(JSON.parse(savedShopItems));
      // setShopItems(avatars);
    } else {
      // If shop items are not stored, set them to the initial array
      setShopItems(avatars);
    }
  }, []);

  useEffect(() => {
    // Stringify the shop items array before storing it in localStorage
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
  }, [shopItems]);

  // Hooks to store points in local storage
  useEffect(() => {
    const storedPoints = localStorage.getItem('points'); // Retrieve points from local storage
    if (storedPoints !== null) {
      setPoints(storedPoints);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('points', points); // Update local storage whenever points change
  }, [points]);

  // Function to update points
  const updatePoints = (newPoints) => {
    setPoints(newPoints);
  };

  // Function to handle earning points
  const earnPoints = (earnedPoints) => {
    const newPoints = points + earnedPoints; // Example: User earns 10 points
    updatePoints(newPoints); // Update points using updatePoints function
  };

  // Function to handle losing points
  const losePoints = (lostPoints) => {
    const newPoints = points - lostPoints; // Example: User loses 5 points
    updatePoints(newPoints); // Update points using updatePoints function
  };


  return (
    <Box width="400px" sx={{ width: { x1: '1488px'}}} m="auto">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} selectedAvatar={selectedAvatar}/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/avatar" element={<Avatar selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} points={points} inventory={inventory}/>} />
            <Route path="/avatar_status" element={<AvatarStatus selectedImages={selectedImages} setSelectedImages={setSelectedImages} points={points} shopItems={shopItems}/>} />
            <Route path="/order_summary" element={<OrderSummary selectedImages={selectedImages} setSelectedImages={setSelectedImages} points={points} losePoints={losePoints} shopItems={shopItems} setShopItems={setShopItems} inventory={inventory} setInventory={setInventory}/>} />
        </Routes>
    </Box>
  )
}

export default App