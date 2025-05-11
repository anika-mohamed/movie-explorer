import { Typography, Box, Divider } from "@mui/material"

function MovieTrailer({ videos }) {
  if (!videos || videos.length === 0) {
    return null
  }

  // Find trailer
  const trailer = videos.find(
    (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
  )

  if (!trailer) {
    return null
  }

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Trailer
      </Typography>
      <Box
        sx={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", mb: 3 }}
      >
        <iframe
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </>
  )
}

export default MovieTrailer
