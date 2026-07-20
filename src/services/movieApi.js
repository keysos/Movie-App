const API_KEY = "db87ef245b11415f2a90041686ef4eff"

/* 

Movie details
const response = await fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
);

Search movies
const response = await fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
);

Trending Movies by Week
https://api.themoviedb.org/3/trending/movie/week

Popular Movies
https://api.themoviedb.org/3/movie/popular

Now on theathers
https://api.themoviedb.org/3/movie/now_playing

Top rated
https://api.themoviedb.org/3/movie/top_rated

Upcoming Releases
https://api.themoviedb.org/3/movie/upcoming

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

export async function fetchMovieDetail(movieId) {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err)
    return null
  }

}