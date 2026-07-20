const API_KEY = "db87ef245b11415f2a90041686ef4eff"

/* 

Movie details
const response = await fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
);

Search movies
const response = await fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
);

*/


export async function fetchMovies(query) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        return data.results.filter(movie => movie.poster_path).sort((a, b) => b.popularity - a.popularity);
    }  catch (err) {
        console.error(err)
        return []
    }
}