import React from 'react'

const SearchBar = ({ query, setQuery, placeholder }) => {

    return (
        <input
            className='search-bar'
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

export default SearchBar