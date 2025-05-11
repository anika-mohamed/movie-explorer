import { Typography, Box, Chip, Rating, Divider } from "@mui/material"
import { formatDate, formatRuntime } from "../utils/helpers"

function MovieDetails({ movie }) {
  if (!movie) return null

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {movie.title} {movie.release_date && <span>({new Date(movie.release_date).getFullYear()})</span>}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
        {movie.release_date && (
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {formatDate(movie.release_date)}
          </Typography>
        )}
        {movie.runtime > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {formatRuntime(movie.runtime)}
          </Typography>
        )}
        <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {movie.vote_average.toFixed(1)}/10
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        {movie.genres &&
          movie.genres.map((genre) => <Chip key={genre.id} label={genre.name} size="small" sx={{ mr: 1, mb: 1 }} />)}
      </Box>

      {movie.tagline && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontStyle: "italic" }}>
          {movie.tagline}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Overview
      </Typography>
      <Typography variant="body1" paragraph>
        {movie.overview || "No overview available."}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {movie.production_companies && movie.production_companies.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Production
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.production_companies.map((company) => company.name).join(", ")}
            </Typography>
          </Box>
        )}

        {movie.spoken_languages && movie.spoken_languages.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Languages
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
            </Typography>
          </Box>
        )}

        {movie.budget > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Budget
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${movie.budget.toLocaleString()}
            </Typography>
          </Box>
        )}

        {movie.revenue > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Revenue
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${movie.revenue.toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MovieDetails
