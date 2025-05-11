"use client"
import { Container, Typography, Box } from "@mui/material"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import TrendingMovies from "../components/TrendingMovies"
import MovieSlider from "../components/MovieSlider"
import { useTheme } from "@mui/material/styles"

function HomePage({ toggleTheme }) {
  const theme = useTheme()

  return (
    <>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === "dark"} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar />

        {/* Featured Movies Slider */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: 0,
                width: 60,
                height: 4,
                backgroundColor: "primary.main",
                borderRadius: 2,
              },
            }}
          >
            Featured Movies
          </Typography>
          <MovieSlider />
        </Box>

        {/* Regular Trending Movies Grid */}
        <TrendingMovies />
      </Container>
    </>
  )
}

export default HomePage
