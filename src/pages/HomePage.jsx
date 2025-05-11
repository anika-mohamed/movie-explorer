"use client"
import { Container } from "@mui/material"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import TrendingMovies from "../components/TrendingMovies"
import { useTheme } from "@mui/material/styles"

function HomePage({ toggleTheme }) {
  const theme = useTheme()

  return (
    <>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === "dark"} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar />
        <TrendingMovies />
      </Container>
    </>
  )
}

export default HomePage
