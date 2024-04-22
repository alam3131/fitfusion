import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import moment from 'moment';

import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Avatar from './pages/Avatar';
import AvatarStatus from './pages/AvatarStatus';
import OrderSummary from './pages/OrderSummary';
import Search from './pages/Search';
import ExerciseDetail from './pages/ExerciseDetail';

// Importing images
import { 
  TheAvatar, 
  Batman, 
  Beast,
  Captain, 
  Catwoman, 
  Cyclops,
  Deadpool2, 
  Flash, 
  Lantern, 
  Groot, 
  Harley2, 
  Hawkeye,
  Hawk, 
  Torch,
  Joker,
  Lex, 
  Magneto, 
  Martian, 
  Penguin, 
  Spiderman, 
  Spongebob, 
  Storm,
  Thanos2, 
  Venom,
  Wonder 
} from './assets/images';

const avatars = [
  [
    { name: 'Avatar', src: TheAvatar, xp: 500 },
    { name: 'Captain America', src: Captain, xp: 500},
    { name: 'Deadpool', src: Deadpool2, xp: 500 },
    { name: 'Martian Manhunter', src: Martian, xp: 500 },
    { name: 'Thanos', src: Thanos2, xp: 500},
    { name: 'Magneto', src: Magneto, xp: 500}
  ],
  [
    { name: 'Batman', src: Batman, xp: 1000 },
    { name: 'Catwoman', src: Catwoman, xp: 1000 },
    { name: 'Flash', src: Flash, xp: 1000 },
    { name: 'Green Lantern', src: Lantern, xp: 1000 },
    { name: 'Groot', src: Groot, xp: 1000 },
    { name: 'Spongebob', src: Spongebob, xp: 1000 }
  ],
  [
    { name: 'Wonder Woman', src: Wonder, xp: 1500 },
    { name: 'Spiderman', src: Spiderman, xp: 1500 },
    { name: 'Harley Quinn', src: Harley2, xp: 1500 },
    { name: 'Hawkman', src: Hawk, xp: 1500 },
    { name: 'Penguin', src: Penguin, xp: 1500 },
    { name: 'Venom', src: Venom, xp: 1500 }
  ],
  [
    { name: 'Joker', src: Joker, xp: 2000 },
    { name: 'Beast', src: Beast, xp: 2000 },
    { name: 'Hawkeye', src: Hawkeye, xp: 2000 },
    { name: 'Human Torch', src: Torch, xp: 2000 },
    { name: 'Storm', src: Storm, xp: 2000 },
    { name: 'Cyclops', src: Cyclops, xp: 2000 }
  ]
];

const App = () => {
  useEffect(() => {
    document.title = "Fitfusion"; // Set the new title
  }, []);

  // Function to initialize the points object with default values for each day of the week
  const initializePointsObject = () => {
    return {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0
    };
  };

  // Initialize the points object
  const [pointsThisWeek, setPointsThisWeek] = useState(() => {
    const storedPointsThisWeek = localStorage.getItem('pointsThisWeek');
    const currentDayOfWeek = moment().format('dddd');

    // Check if it's Sunday, then reset pointsThisWeek
    if (currentDayOfWeek === 'Sunday') {
      return initializePointsObject();
    } else {
      // Load pointsThisWeek from localStorage
      return storedPointsThisWeek ? JSON.parse(storedPointsThisWeek) : initializePointsObject();
    }
  });

  const [activeTab, setActiveTab] = useState('Home'); // Sets the tab of which is currently active from navbar
  const [selectedAvatar, setSelectedAvatar] = useState(); // The avatar for profile 
  const [selectedImages, setSelectedImages] = useState([]); // The array of images that are selected in shop
  const [points, setPoints] = useState(0); // State variable to save the points the user has
  const [inventory, setInventory] = useState([]); // The array of avatars in your inventory
  const [shopItems, setShopItems] = useState([]); // The array of avatars in the shop
  const [workoutsToCalender, setWorkoutsToCalender] = useState([]);
  const [weeklyExercises, setWeeklyExercises] = useState([]);
  const [activeStreak, setActiveStreak] = useState(0);
  const [workOutsToday, setworkOutsToday] = useState([]);
  const today = moment().format('dddd');  // Gets today's day name, e.g., 'Monday'
  const todayPoints = pointsThisWeek[today];  // Access the points for today from the object
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]); // State variable to hold today's workouts
  const [tentativePoints, setTentativePoints] = useState(0)
  
  const getPointsForLevel = (level) => {
    switch (level) {
      case 'Beginner':
        return 100;
      case 'Intermediate':
        return 200;
      case 'Expert':
        return 300;
      default:
        return 0;
    }
  };
  
  // Function to check if a date is today
  const isToday = (date) => {
    return moment(date).isSame(moment(), 'day');
  };

  // Function to filter workouts for today
  const filterTodaysWorkouts = () => {
    const todaysWorkouts = workoutsToCalender.filter((event) => isToday(event.start));
    setTodaysWorkouts(todaysWorkouts);
  };

  // useEffect to filter today's workouts when workoutsToCalender changes
  useEffect(() => {
    filterTodaysWorkouts();
  }, [workoutsToCalender]);

  useEffect(() => {
    // Load buttonDisabled status from localStorage on component mount
    const storedButtonDisabled = localStorage.getItem('buttonDisabled');
    if (storedButtonDisabled) {
      setButtonDisabled(JSON.parse(storedButtonDisabled));
    }
    // alert("today's workout: " + JSON.stringify(todaysWorkouts));
  }, []);

  useEffect(() => {
    // Save buttonDisabled status to localStorage whenever it changes
    localStorage.setItem('buttonDisabled', JSON.stringify(buttonDisabled));
  }, [buttonDisabled]);

  // Function to update points earned on a specific day of the week
  const updatePointsForDay = (dayOfWeek, pointsEarned) => {
    setPointsThisWeek(prevPoints => ({
      ...prevPoints,
      [dayOfWeek]: prevPoints[dayOfWeek] + pointsEarned
    }));
  };

  // Hooks to store selected avatar in local storage
  useEffect(() => {
    // Load selectedAvatar from localStorage on component mount
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    } else {
      setSelectedAvatar(Lex);
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
      // setInventory([{ name: 'Lex Luthor', src: Lex, xp: 0 }]);
    } else {
      // If inventory is not stored, set it to the avatars array
      setInventory([{ name: 'Lex Luthor', src: Lex, xp: 0 }]);
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
      setPoints(Number(storedPoints));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('points', Number(points)); // Update local storage whenever points change
  }, [points]);

  // Store pointsThisWeek in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('pointsThisWeek', JSON.stringify(pointsThisWeek));
  }, [pointsThisWeek]);

  // Function to update points
  const updatePoints = (newPoints) => {
    setPoints(Number(newPoints));
    // setPoints(0)
  };

  // Function to handle earning points
  const earnPoints = (earnedPoints) => {
    const newPoints = points + Number(earnedPoints); // Example: User earns 10 points
    updatePoints(newPoints); // Update points using updatePoints function
    const dayOfWeek = moment().format('dddd');
    updatePointsForDay(dayOfWeek, earnedPoints); // Update points for the current day
  };

  // Function to handle losing points
  const losePoints = (lostPoints) => {
    const newPoints = points - Number(lostPoints); // Example: User loses 5 points
    updatePoints(newPoints); // Update points using updatePoints function
  };

  useEffect(() => {
    // Load workoutsToCalender from localStorage on component mount
    const savedWorkouts = localStorage.getItem('workoutsToCalender');
    if (savedWorkouts) {
      setWorkoutsToCalender(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    // Save workoutsToCalender to localStorage on change
    localStorage.setItem('workoutsToCalender', JSON.stringify(workoutsToCalender));
  }, [workoutsToCalender]);

  const clearLocalStorage = () => {
    localStorage.clear();
    alert('Local storage cleared successfully!');
  };

  // Event listener for the space bar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32) { // Check if the pressed key is the space bar (key code 32)
        clearLocalStorage();
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <Box width="400px" sx={{ width: { x1: '1488px'}}} m="auto">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} selectedAvatar={selectedAvatar} points={points}/>
        <Routes>
            <Route path="/" element={<Home updatePointsForDay={updatePointsForDay} tentativePoints={tentativePoints} earnPoints={earnPoints} updatePoints={updatePoints} setActiveTab={setActiveTab} pointsThisWeek={pointsThisWeek} setPointsThisWeek={setPointsThisWeek} points={points} weeklyExercises={weeklyExercises} activeStreak={activeStreak} setActiveStreak = {setActiveStreak} todayPoints={todayPoints} buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled} todaysWorkouts={todaysWorkouts}/>}/>
            <Route path="/search/:WorkOut" element={<ExerciseDetail  getPointsForLevel={getPointsForLevel} tentativePoints={tentativePoints} setTentativePoints={setTentativePoints} setWorkoutsToCalender={setWorkoutsToCalender} workoutsToCalender={workoutsToCalender}/>} />
            <Route path="/search" element={<Search earnPoints={earnPoints} points={points} setWorkoutsToCalender={setWorkoutsToCalender} workoutsToCalender={workoutsToCalender}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar getPointsForLevel={getPointsForLevel} workoutsToCalender={workoutsToCalender} setWorkoutsToCalender={setWorkoutsToCalender} setWeeklyExercises={setWeeklyExercises} tentativePoints={tentativePoints} setTentativePoints={setTentativePoints}/>} />
            <Route path="/avatar" element={<Avatar selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} points={points} inventory={inventory}/>} />
            <Route path="/avatar_status" element={<AvatarStatus selectedImages={selectedImages} setSelectedImages={setSelectedImages} points={points} shopItems={shopItems}/>} />
            <Route path="/order_summary" element={<OrderSummary selectedImages={selectedImages} setSelectedImages={setSelectedImages} points={points} losePoints={losePoints} shopItems={shopItems} setShopItems={setShopItems} inventory={inventory} setInventory={setInventory}/>} />
        </Routes>
    </Box>
  )
}

export default App