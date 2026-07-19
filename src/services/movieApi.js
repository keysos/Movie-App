const API_KEY = "5890ca34"

export async function fetchMovies(query) {

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        return data.Search.filter((movie) => movie.Poster !== 'N/A') || [];
    }  catch (err) {
        console.error(err)
        return []
    }
}