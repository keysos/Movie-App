import React from 'react'

const SearchBar = ({ query, setQuery, placeholder }) => {

    return (
        <>
            <label htmlFor="movie-search" className="sr-only">{placeholder}</label>
            <input
                id="movie-search"
                className='search-bar'
                type="search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </>
    )
}

export default SearchBar