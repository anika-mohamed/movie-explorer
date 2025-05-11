"use client"
import { useState, useEffect, useRef } from "react"
import { Box, Typography, IconButton, useTheme, useMediaQuery, Paper } from "@mui/material"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { getTrendingMovies } from "../services/api"

function MovieSlider() {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  // Fetch trending movies for the slider
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies()
        // Use only the first 5 movies with backdrop images
        const moviesWithBackdrops = data.filter((movie) => movie.backdrop_path).slice(0, 5)
        setMovies(moviesWithBackdrops)
      } catch (error) {
        console.error("Error fetching movies for slider:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [movies.length])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  if (loading || movies.length === 0) {
    return null // Don't render anything while loading or if no movies
  }

  const sliderHeight = isMobile ? "30vh" : isTablet ? "40vh" : "50vh"

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: sliderHeight,
        overflow: "hidden",
        mb: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
      ref={sliderRef}
    >
      {/* Slides */}
      {movies.map((movie, index) => (
        <Box
          key={movie.id}
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            textDecoration: "none",
            color: "inherit",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, sm: 3, md: 4 },
              zIndex: 2,
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                mb: 1,
              }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                display: { xs: "none", sm: "block" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {movie.overview}
            </Typography>
            <Paper
              sx={{
                display: "inline-block",
                px: 1,
                py: 0.5,
                mt: 1,
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Rating: {movie.vote_average.toFixed(1)}/10
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}

      {/* Navigation arrows */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          zIndex: 2,
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.7)",
          },
          display: { xs: "none", sm: "flex" },
        }}
        aria-label="Previous movie"
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          zIndex: 2,
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.7)",
          },
          display: { xs: "none", sm: "flex" },
        }}
        aria-label="Next movie"
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Dots indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {movies.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: index === currentIndex ? "primary.main" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MovieSlider
