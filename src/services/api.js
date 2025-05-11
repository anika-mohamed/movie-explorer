import axios from "axios"

// Create axios instance with API key
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e37fa734f6dcc2050357c574b253f0bb", // Using the key directly since it's already exposed in the code
  },
})

// Get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day")
    return response.data.results
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return []
  }
}

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, page },
    })
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    }
  } catch (error) {
    console.error("Error searching movies:", error)
    return { results: [], totalPages: 0 }
  }
}

// Get movie details
export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: { append_to_response: "videos" },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error)
    return null
  }
}

// Get movie cast
export const getMovieCast = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`)
    return response.data.cast.slice(0, 10) // Get top 10 cast members
  } catch (error) {
    console.error(`Error fetching cast for movie ID ${id}:`, error)
    return []
  }
}
