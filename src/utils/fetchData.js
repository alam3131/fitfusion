export const exerciseOptions =  {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': '0857ff26c6mshfd700d4a86bd0a6p104498jsne068947d7a28',
    },
  };

export const fetchData = async (url, options) => {
    const response = await fetch(url,options);
    const data = await response.json()

    return data;
}