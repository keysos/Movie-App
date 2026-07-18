import React from 'react'

const SearchBar = ( {query, setQuery, placeholder}) => {
  return (
    <input 
        className='search-bar'
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
    />
  )
}

export default SearchBar