import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import Logo from '../assets/images/unnamed.png';
import SearchExercises from '../components/SearchExercises';

const Navbar = ({ activeTab, setActiveTab, selectedAvatar, points }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Stack direction="row" justifyContent="space-around" marginTop= {5} sx={{ gap: {sm: '122px', xs: '40px'}, justifyContent: 'none'}}>
      <Stack
        direction="row"
        gap="40px"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link to="/" onClick={() => handleTabClick('Home')}>
                <img src={Logo} alt="logo" style={{ width: '60px', height: '52px', margin: '0 20px'}}/>
        </Link>
        <Link 
          to="/" 
          style={
            {textDecoration: 'none', color: "#128731", marginLeft: '100px', marginBottom: '10px', borderBottom: activeTab === 'Home' ? '3px solid #FF2625' : 'none'}
          } 
          onMouseEnter={(e) => { e.target.style.borderBottom = '3px solid #FF2625'; }}
          onMouseLeave={(e) => { if (activeTab !== 'Home') e.target.style.borderBottom = 'none'; }} 
          onClick={() => handleTabClick('Home')}>Home</Link>
        <Link 
          to="/profile" 
          style={
            {textDecoration: 'none', color: "#128731", marginBottom: '10px', borderBottom: activeTab === 'My Profile' ? '3px solid #FF2625' : 'none'}
          }
          onMouseEnter={(e) => { e.target.style.borderBottom = '3px solid #FF2625'; }}
          onMouseLeave={(e) => { if (activeTab !== 'My Profile') e.target.style.borderBottom = 'none'; }}
          onClick={() => handleTabClick('My Profile')}>My Profile</Link>
        <Link 
          to="/calendar" 
          style={
            {textDecoration: 'none', color: "#128731", marginBottom: '10px', borderBottom: activeTab === 'Calendar' ? '3px solid #FF2625' : 'none'}
          }
          onMouseEnter={(e) => { e.target.style.borderBottom = '3px solid #FF2625'; }}
          onMouseLeave={(e) => { if (activeTab !== 'Calendar') e.target.style.borderBottom = 'none'; }} 
          onClick={() => handleTabClick('Calendar')}>Calendar</Link>
        <Link 
          to="/search"
          style={
            {textDecoration: 'none', color: "#128731", marginBottom: '10px', borderBottom: activeTab === 'Search' ? '3px solid #FF2625' : 'none'}
          } 
          onMouseEnter={(e) => { e.target.style.borderBottom = '3px solid #FF2625'; }}
          onMouseLeave={(e) => { if (activeTab !== 'Search') e.target.style.borderBottom = 'none'; }} 
          onClick={() => handleTabClick('Search')}>Search</Link>
        <Typography mb={2} ml={10} mr={45} style={{ fontWeight: 'bold' }}>Total XP: {points} </Typography>  
        <Link to="/avatar" onClick={() => handleTabClick('Avatar')}>
            <img src={selectedAvatar} alt="avatar" style={{ width: '60px', height: '52px', margin: '0 20px', marginBottom: '-6px', border: '2px solid black'}}/>
        </Link>
      </Stack>
    </Stack>
  );
}

export default Navbar;
