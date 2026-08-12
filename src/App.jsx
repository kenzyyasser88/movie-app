import {useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
  setLoading(true);
  setError("");

   try {
    const response = await fetch(
     `https://www.omdbapi.com/?apikey=ccf78c9c&s=${searchTerm}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      setError(data.Error);
      setMovies([]);
      return;
    }

    setMovies(data.Search);
  } catch (error) {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


 return (
  <div className="app">
    <h1>🎬 Movie App</h1>

    <div className="search">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>
    </div>

    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
      />
    ))}

    <p>you searched for: {searchTerm}</p>
  </div>
);
}
export default App;
