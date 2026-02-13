// export const exerciseUrl = "https://exercisedb.p.rapidapi.com/exercises";

// export const exerciseOptions = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
//     "x-rapidapi-host": "exercisedb.p.rapidapi.com",
//   },
// };

// export const fetchData = async (url, options) => {
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json(); // TODO: May have to change this to .json(). Was in .text()
//     // console.log(result);

//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };
export const fetchData = async () => {
  try {
    // Call your serverless function
    const response = await fetch("/.netlify/functions/rapid-proxy");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};