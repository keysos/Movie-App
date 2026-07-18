const API_KEY = "5890ca34"

export async function fetchMovies(query) {
    try {
        const response = await fetch (
            `https://www.omdbapi.com/?apiKey=${API_KEY}&s=${query}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        return data.Search || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}