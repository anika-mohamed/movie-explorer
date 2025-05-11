"use client"
import { useState, useEffect } from "react"
import { Grid, Typography, Box } from "@mui/material"
import MovieCard from "./MovieCard"
import LoadingIndicator from "./LoadingIndicator"
import ErrorDisplay from "./ErrorDisplay"
import { getTrendingMovies } from "../services/api"

function TrendingMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTrendingMovies()
      setMovies(data)
    } catch (err) {
      console.error("Failed to fetch trending movies:", err)
      setError("Failed to load trending movies. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  if (loading) {
    return <LoadingIndicator message="Loading trending movies..." />
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchMovies} />
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">No trending movies found</Typography>
      </Box>
    )
  }

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Trending Movies
      </Typography>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average || 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TrendingMovies
