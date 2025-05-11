# Movie Explorer
 (https://via.placeholder.com/1200x300?text=Movie+Explorer)

A modern, responsive React application for discovering and exploring movies. This application uses The Movie Database (TMDB) API to fetch movie data and provides features like searching, viewing movie details, and managing favorites.

## 🎬 Features

- **Movie Discovery**: Browse trending movies on the homepage
- **Search Functionality**: Search for movies by title
- **Detailed Movie Information**: View comprehensive details about each movie including:
  - Overview, release date, runtime, and rating
  - Cast information
  - Trailers (when available)
  - Production details
- **User Authentication**: Simple login system to manage user sessions
- **Favorites Management**: Add/remove movies to your favorites list
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Infinite Scrolling**: Option to load more search results as you scroll

## 🛠️ Technologies Used

- **React**: Frontend library for building the user interface
- **React Router**: For navigation and routing
- **Material UI**: Component library for styling
- **Axios**: For API requests
- **Context API**: For state management (auth and favorites)
- **Local Storage**: For persisting user data and preferences

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- TMDB API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer