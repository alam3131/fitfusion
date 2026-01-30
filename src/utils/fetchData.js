export const exerciseUrl = 'https://exercisedb.p.rapidapi.com/exercises';
export const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

export const exerciseOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
		'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
	}
};

export const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const result = await response.json(); // TODO: May have to change this to .json(). Was in .text()
      console.log(result);

      return result;
    } catch (error) {
      console.error(error);
    }

    // const response = await fetch(url,options);
    // const data = await response.json()

    // return data;
}