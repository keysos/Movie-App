import React, { useEffect, useState } from 'react'

import { fetchMovies } from '../services/movieApi'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'

const Home = () => {

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getMovies() {
            if (!query) {
                setMovies([]);
                setError("");
                return;
            }

            setLoading(true)
            setError("error")

            try {
                console.log("Fetching movies for query:", query);
                const results = await fetchMovies(query);
                console.log("Results received:", results);

                 if (!results || results.length === 0) {
                    setError("No movies found. Try a different search.");
                } else {
                    setMovies(results);
                }
            } catch (err) {
                console.error("Error fetching movies", err);
                setError("Failed to fetch movies. Check your API key.")
            } finally {
                setLoading(false)
            }

            
        }
        getMovies();
    }, [query])


    return (
        <div>
            <h1>🎬 Movie Search</h1>
            <SearchBar 
                query={query}
                setQuery={setQuery}
                placeholder="Search for a movie..."
            />

            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            
            {!loading && movies.length > 0 && (
                <p className='result-count'>Found {movies.length} result(s)</p>
            )}

            <MovieList movies={movies}/>
        </div>
    )
}

export default Home