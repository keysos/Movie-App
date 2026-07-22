import React, { useState } from 'react'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import { fetchMedia, fetchPopularMedia, fetchTopRatedMedia, fetchTrendingMedia } from '../services/TMDBApi'
import SearchBar from '../components/SearchBar'
import { useDocumentTitle } from '../services/useDocumentTitle'

const MEDIA_TYPE = "tv";

const TVShows = () => {

    useDocumentTitle("TV Shows | CineSearch")

    const [query, setQuery] = useState("");
    const [queryMedia, setQueryMedia] = useState([])
    const [selectedMedia, setSelectedMedia] = useState(null)

    return (
        <div>TVShows</div>
    )
}

export default TVShows