import React from "react";
import MovieList from "./MovieList/MovieList";
import MovieItem from "./MovieItem/MovieItem";
import "./MovieComponent.css";

export const MovieComponent = ({ setMovie, moviesIds, selectedMovie }) => {
  return (
    <div className="mainContainer">
      <MovieList setMovie={setMovie} moviesIds={moviesIds}></MovieList>
      {selectedMovie && (
        <div className="movieItemcontainer">
          <MovieItem movie={selectedMovie} />
        </div>
      )}
    </div>
  );
};
