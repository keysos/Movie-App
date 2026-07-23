const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Fetch media based on search query and media type (movie or tv)

export async function fetchMedia(mediaType, query, page = 1) {

    try {
        const response = await fetch(`${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();

        return {
            results: data.results.filter((media) => media.poster_path).sort((a, b) => b.popularity - a.popularity),
            pages: data.pages,
            totalPages: data.total_pages,
            totalResults: data.total_results

        }
    }  catch (err) {
        console.error(err)
        return {
            results: [],
            page: 1,
            totalPages: 0,
            totalResults: 0,
        };
    }
}

// Fetch media recommendations based on media type and media ID

export async function fetchMediaRecommendations(mediaType, mediaId) {

    try {
        const response = await fetch (`https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?api_key=${API_KEY}`);
        const data = await response.json()

        return data.results || [];

    } catch (err) {
        console.error(err)
        return []
    }
}

// Fetch media details and watch providers based on media type and media ID

export async function fetchMediaDetail(mediaType, mediaId) {

    try {
        const [detailsResponse, providersResponse] = await Promise.all([
            fetch(
                `${BASE_URL}/${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=external_ids,credits`
            ),
            fetch(
                `${BASE_URL}/${mediaType}/${mediaId}/watch/providers?api_key=${API_KEY}`
            )
        ]);

        const data = await detailsResponse.json();
        const providersData = await providersResponse.json();

        const result = {
            ...data,
            providers: providersData
        };

        return result;

    } catch (err) {
        console.error(err);
        return null;
    }
}

// Fetch media based on category (trending, popular, top rated) and media type

async function fetchCategoryMedia(endpoint) {
    try {
        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}`
        );

        const data = await response.json();

        return data.results

    } catch (err) {
        console.error(err);
        return [];
    }
}

// Trending media this week
export async function fetchTrendingMedia(mediaType) {
    return fetchCategoryMedia(`/trending/${mediaType}/week`);
}

// Popular media 
export async function fetchPopularMedia(mediaType) {
    return fetchCategoryMedia(`/${mediaType}/popular`);
}

// Top rated media
export async function fetchTopRatedMedia(mediaType) {
    return fetchCategoryMedia(`/${mediaType}/top_rated`);
}
