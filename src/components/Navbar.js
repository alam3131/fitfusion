import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material'

import Logo from '../assets/images/unnamed.png';
import Deadpool from '../assets/images/deadpool_avatar.png';
import SearchExercises from '../components/SearchExercises';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Stack direction="row" justifyContent="space-around" sx={{ gap: {sm: '122px', xs: '40px'}, mt: { sm: '32px', xs: '20px'}, justifyContent: 'none'}}>
        <Stack direction="column">
          <Link to="/">
            <img src={Logo} alt="logo" style={{ width: '60px', height: '52px', margin: '0 20px'}}/>
          </Link>
        </Stack>
        
        <Stack
            direction="row"
            gap="40px"
            fontSize="24px"
            alignItems="flex-end"
        >
            <Link 
              to="/" 
              style={
                {textDecoration: 'none', color: "#128731", borderBottom: activeTab === 'Home' ? '3px solid #FF2625' : 'none'}
              } 
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#DCDCDC'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} 
              onClick={() => handleTabClick('Home')}>Home</Link>
            <Link 
              to="/profile" 
              style={
                {textDecoration: 'none', color: "#128731", borderBottom: activeTab === 'My Profile' ? '3px solid #FF2625' : 'none'}
              }
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#DCDCDC'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} 
              onClick={() => handleTabClick('My Profile')}>My Profile</Link>
            <Link 
              to="/calendar" 
              style={
                {textDecoration: 'none', color: "#128731", borderBottom: activeTab === 'Calendar' ? '3px solid #FF2625' : 'none'}
              }
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#DCDCDC'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} 
              onClick={() => handleTabClick('Calendar')}>Calendar</Link>
            <Stack direction="column">
              <Link to="/avatar">
                <img src={Deadpool} alt="avatar" style={{ width: '60px', height: '52px', margin: '0 20px', marginLeft: '750px', border: '2px solid black'}}/>
              </Link>
              <SearchExercises />
            </Stack>
        </Stack>
    </Stack>
  )
}

export default Navbar;