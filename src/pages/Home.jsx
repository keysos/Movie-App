import React, { useEffect, useState } from 'react'

import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import { fetchMovies } from '../services/movieApi'

const Home = () => {

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function getMovies() {
            setLoading(true);

            try {
                const result = await fetchMovies(query);

                if (!result) {
                    setError("Error during fetching movies")
                }

                setError("")

                if (result.length === 0 && query.length >= 1) setError("No movies were found");

                setMovies(result);
            } catch (err) {
                console.error(err);
                setError("Error during fetching movies");
            } finally {
                setLoading(false);
            }
        }
        getMovies();
    }, [query])


    return (
        <div>
            <h1 className='title'>Movie Search</h1>

            <SearchBar query={query} setQuery={setQuery} placeholder="Search a movie..." />

            {loading && <p className='loading'>Loading...</p>}

            {error !== "" && <p className='error'>{error}</p>}

            {(!loading && movies.length > 0) && <p className='result-count'>Found {movies.length} result(s)</p>}

            <MovieList movies={movies}/>
        </div>
    )
}

export default Home
