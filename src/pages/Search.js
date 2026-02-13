import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { exerciseOptions, exerciseUrl, fetchData } from "../utils/fetchData";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

export const muscleGroups = await fetchData(
  `${exerciseUrl}/targetList`,
  exerciseOptions,
);
const levelGroups = ["beginner", "intermediate", "advanced"];

// Function to calculate points based on level
const getPointsForLevel = (level) => {
  switch (level) {
    case "beginner":
      return 100;
    case "intermediate":
      return 200;
    case "advanced":
      return 300;
    default:
      return 0;
  }
}; //******************************************* */

const SearchExcercises = ({
  earnPoints,
  points,
  setWorkoutsToCalender,
  workoutsToCalender,
}) => {
  const [search, setSearch] = useState("");
  const [excercises, setExcercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedLevel, setLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  const handleLevelAndMuscleFilter = async () => {
    if (selectedMuscle && selectedLevel) {
      let offset = 0; // Offset to track where last request left off
      let exercisesData = []; // Array of exercises retrieved from request

      // Make two requests to get a total of 20 exercises
      // Appends responses to exercisesData array
      for (let i = 0; i < 2; i++) {
        const response = await fetchData(
          `${exerciseUrl}/target/${selectedMuscle}?offset=${offset}`,
          exerciseOptions,
        );
        exercisesData = exercisesData.concat(response);
        offset += 10;
      }

      // Filters the exercises to only include ones with specified difficulty level
      const filteredExercises = exercisesData.filter((item) =>
        item.difficulty.toLowerCase().includes(selectedLevel.toLowerCase()),
      );
      console.log("The filtered Exercises:", filteredExercises);
      setExcercises(filteredExercises);
    } else if (selectedMuscle) {
      handleMuscleGroupClick(selectedMuscle);
    } else if (selectedLevel) {
      handleLevelGroupClick(selectedLevel);
    }
  };

  const handleLevelGroupClick = async (Level) => {
    setLevel(Level);
    let offset = 0; // Offset to track where last request left off
    let exercisesData = []; // Array of exercises retrieved from request

    // Make two requests to get a total of 40 exercises
    // Appends responses to exercisesData array
    for (let i = 0; i < 4; i++) {
      const response = await fetchData(`${exerciseUrl}?offset=${offset}`,
        exerciseOptions,
      );
      exercisesData = exercisesData.concat(response);
      offset += 10;
    }
    const filteredByLevel = exercisesData.filter((item) =>
      item.difficulty.toLowerCase().includes(Level.toLowerCase()),
    );
    setExcercises(filteredByLevel);
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = excercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  );

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const handleMuscleGroupClick = async (muscle) => {
    let offset = 0; // Offset to track where last request left off
    let exercisesData = []; // Array of exercises retrieved from request

    // Make two requests to get a total of 20 exercises
    // Appends responses to exercisesData array
    for (let i = 0; i < 2; i++) {
      const response = await fetchData(
        `${exerciseUrl}/target/${selectedMuscle}?offset=${offset}`,
        exerciseOptions,
      );
      exercisesData = exercisesData.concat(response);
      offset += 10;
    }
    setExcercises(exercisesData);
  };

  const handleSearch = async () => {
    if (search) {
      // Searches based on names that have the keyword
      const exercisesData = await fetchData(
        `${exerciseUrl}/name/${search}`,
        exerciseOptions,
      );
      let searchedExercises = exercisesData;

      if (selectedMuscle && selectedLevel) {
        searchedExercises = searchedExercises.filter(
          (item) =>
            [item.target, ...(item.secondaryMuscles ?? [])].join(", ").toLowerCase().includes(selectedMuscle) &&
            item.difficulty.toLowerCase().includes(selectedLevel.toLowerCase())
        );
      } else if (selectedMuscle) {
        searchedExercises = searchedExercises.filter(
          (item) =>
            [item.target, ...(item.secondaryMuscles ?? [])].join(", ").toLowerCase().includes(selectedMuscle)
        );
      } else if (selectedLevel) {
        searchedExercises = searchedExercises.filter(
          (item) =>
            item.difficulty.toLowerCase().includes(selectedLevel.toLowerCase())
        );
      }

      setExcercises(searchedExercises);
    } else { // Handles when search bar is not filled
      handleLevelAndMuscleFilter();
    }
    setCurrentPage(1); // Resets pagination every time a search is performed
  };

  const handleExcerciseClick = (exercise) => {
    // earnPoints(Number(getPointsForLevel(exercise.Intensity_Level)));
    // alert("Muscle Groups" + JSON.stringify(currentExercises));
  }; //****************************************** */

  const capitalizeEachWord = (str) => {
    return str
      .toLowerCase() // Convert the whole string to lowercase for consistency
      .split(' ')    // Split the string into an array of words based on spaces
      .map(word => { // Iterate over each word
        // Capitalize the first letter and add the rest of the word
        return word.charAt(0).toUpperCase() + word.slice(1); 
      })
      .join(' ');    // Join the words back into a single string with spaces
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Stack
      alignItems="center"
      mt="37px"
      justifyContent="center"
      p="20px"
      spacing={4}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises For <br /> You
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "550px", xs: "250px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#128731",
            color: "#fff",
            textTransform: "none",
            height: "56px",
            fontSize: { lg: "20px", xs: "14px" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormControl
          sx={{
            width: "200px",
            bgcolor: "#128731",
            borderRadius: "4px",
            fontSize: { lg: "20px", xs: "14px" },
          }}
        >
          <Select
            className="search-btn"
            sx={{
              color: "#fff",
              fontSize: { lg: "20px", xs: "14px" },
              height: "56px",
            }}
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
            displayEmpty
            // Customize scrollbar width bgcolor: '#128731' sx={{ color: '#FFFFFF' }
          >
            <MenuItem value="" disabled>
              Muscle Group
            </MenuItem>
            {muscleGroups.map((muscle, index) => (
              <MenuItem key={index} value={muscle}>
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: "250px",
            bgcolor: "#128731",
            borderRadius: "4px",
            fontSize: { lg: "20px", xs: "14px" },
          }}
        >
          <Select
            className="search-btn"
            sx={{
              color: "#fff",
              fontSize: { lg: "20px", xs: "14px" },
              height: "56px",
            }}
            value={selectedLevel}
            onChange={(e) => setLevel(e.target.value)}
            displayEmpty
            // Customize scrollbar width bgcolor: '#128731' sx={{ color: '#FFFFFF' }
          >
            <MenuItem value="" disabled>
              Experience Level
            </MenuItem>
            {levelGroups.map((level, index) => (
              <MenuItem key={index} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={2} flexWrap="wrap" justifyContent="center">
        {currentExercises.length > 0 ? (
          currentExercises.map((exercise, index) => (
            <Button
              key={index}
              onClick={() => handleExcerciseClick(exercise)}
              variant="contained"
              sx={{
                bgcolor: "#128731",
                color: "#fff", // White text color
                borderRadius: 4,
                textAlign: "center",
                mt: 25,
                mx: "auto",
                display: "block",
                width: "300px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "transparent", // Transparent background color on hover
                  borderColor: "red", // Red border color on hover
                  "& > .MuiBox-root": {
                    color: "red", // Change text color of the box to red on hover
                    borderColor: "red", // Change border color of the box to red on hover
                  },
                },
              }}
            >
              <Box p={2} borderRadius={4} sx={{ color: "#fff" }}>
                <Typography variant="h6">{capitalizeEachWord(exercise.name)}</Typography>
                <Typography variant="body1">
                  Muscles:{" "}
                  {[exercise.target, ...(exercise.secondaryMuscles ?? [])].join(
                    ", ",
                  )}
                </Typography>
                <Typography variant="body2">
                  Level: {exercise.difficulty}
                </Typography>
                <Typography variant="body2">
                  Points: {getPointsForLevel(exercise.difficulty)}
                </Typography>
                <Link to={`/search/${exercise.name}`} state={exercise}>
                  <Button
                    className="search-btn"
                    sx={{ bgcolor: "#FF2625", color: "#fff" }}
                  >
                    View Details
                  </Button>
                </Link>
              </Box>
            </Button>
          ))
        ) : (
          <Typography>No results found...</Typography>
        )}
      </Stack>

      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {excercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(excercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Stack>
  );
};

export default SearchExcercises;
