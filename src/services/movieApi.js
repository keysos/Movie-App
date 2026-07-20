const API_KEY = "db87ef245b11415f2a90041686ef4eff"
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query) {

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        return data.results.filter(movie => movie.poster_path).sort((a, b) => b.popularity - a.popularity);
    }  catch (err) {
        console.error(err)
        return []
    }
}

export async function fetchMovieDetail(movieId) {

  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=external_ids,credits`)
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err)
    return null
  }
}

async function fetchCategoryMovies(endpoint) {
    try {
        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}`
        );

        const data = await response.json();

        return data.results
            .filter(movie => movie.poster_path);

    } catch (err) {
        console.error(err);
        return [];
    }
}

// Trending movies this week
export async function fetchTrendingMovies() {
    return fetchCategoryMovies("/trending/movie/week");
}


// Popular movies
export async function fetchPopularMovies() {
    return fetchCategoryMovies("/movie/popular");
}


// Now playing in theaters
export async function fetchNowPlayingMovies() {
    return fetchCategoryMovies("/movie/now_playing");
}


// Top rated movies
export async function fetchTopRatedMovies() {
    return fetchCategoryMovies("/movie/top_rated");
}


// Upcoming movies
export async function fetchUpcomingMovies() {
    return fetchCategoryMovies("/movie/upcoming");
}