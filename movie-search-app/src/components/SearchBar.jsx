import React from 'react'

const SearchBar = ({ query, setQuery, placeholder }) => {

    return (
        <>
            <label htmlFor="media-search" className="sr-only">{placeholder}</label>
            <input
                id="media-search"
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