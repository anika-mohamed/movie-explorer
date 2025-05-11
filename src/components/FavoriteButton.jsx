"use client"
import { useState, useEffect } from "react"
import { IconButton, Tooltip } from "@mui/material"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function FavoriteButton({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if (movie && movie.id) {
      setFavorite(isFavorite(movie.id))
    }
  }, [movie, isFavorite])

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user?.isLoggedIn) {
      navigate("/login")
      return
    }

    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }

    setFavorite(!favorite)
  }

  return (
    <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
      <IconButton
        onClick={handleToggleFavorite}
        color="secondary"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
      >
        {favorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  )
}

export default FavoriteButton
