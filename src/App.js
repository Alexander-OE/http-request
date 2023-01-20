import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);



useEffect (() =>{
  fetchMoviesHandler();
}, []);

  async function fetchMoviesHandler() {
    setisLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      // The responseobject we get back has a "OK" field and it singals if the response was successful or not
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      // it converts JSON data to js objects and returns a promise
      const data = await response.json();

      // here we change the json name to match our props name
      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
