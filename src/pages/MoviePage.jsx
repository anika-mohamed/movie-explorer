"use client"

// src/pages/MoviePage.jsx
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Typography, Grid, Box, Paper, CircularProgress, Button } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import Header from "../components/Header"
import FavoriteButton from "../components/FavoriteButton"
import MovieDetails from "../components/MovieDetails"
import MovieCast from "../components/MovieCast"
import MovieTrailer from "../components/MovieTrailer"
import { getMovieDetails, getMovieCast } from "../services/api"
import { useTheme } from "@mui/material/styles"

function MoviePage({ toggleTheme }) {
  const { id } = useParams()
  const theme = useTheme()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch movie details
        const movieData = await getMovieDetails(id)
        if (!movieData) {
          throw new Error("Movie not found")
        }
        setMovie(movieData)

        // Fetch cast
        const castData = await getMovieCast(id)
        setCast(castData)
      } catch (err) {
        setError("Failed to load movie details. Please try again.")
        console.error("Error fetching movie:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  if (loading) {
    return (
      <>
        <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === "dark"} />
        <Container sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      </>
    )
  }

  if (error || !movie) {
    return (
      <>
        <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === "dark"} />
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography color="error" variant="h5" gutterBottom>
            {error || "Movie not found"}
          </Typography>
          <Button variant="contained" component={Link} to="/" startIcon={<ArrowBack />}>
            Back to Home
          </Button>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === "dark"} />

      {/* Backdrop */}
      {movie.backdrop_path && (
        <Box
          sx={{
            height: { xs: "30vh", md: "50vh" },
            width: "100%",
            position: "relative",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ py: 4, mt: movie.backdrop_path ? -20 : 0, position: "relative" }}>
        <Button variant="contained" color="primary" startIcon={<ArrowBack />} component={Link} to="/" sx={{ mb: 3 }}>
          Back to Home
        </Button>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                  <FavoriteButton movie={movie} />
                </Box>
              </Box>
            </Grid>

            {/* Movie Details */}
            <Grid item xs={12} sm={8} md={9}>
              <MovieDetails movie={movie} />

              {cast.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Cast
                  </Typography>
                  <MovieCast cast={cast} />
                </Box>
              )}

              {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
                <MovieTrailer videos={movie.videos.results} />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default MoviePage
