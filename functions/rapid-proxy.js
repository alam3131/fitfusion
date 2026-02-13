const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const rapidKey = process.env.RAPID_API_KEY;
    const url = "https://exercisedb.p.rapidapi.com/exercises";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};