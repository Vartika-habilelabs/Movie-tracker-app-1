import React, { useEffect, useRef } from "react";

const MovieList = ({ setMovie, moviesIds }) => {
  const handleGetDetailsClick = (movie) => {
    setMovie(movie);
  };
  const h1ref = useRef(null);

  const addElement = () => {
    if (!h1ref.current.childElementCount) {
      const h1Element = document.createElement("h1");
      h1Element.textContent = "No Movies found... 😞";
      h1ref.current.appendChild(h1Element);
    }
  };

  useEffect(() => {
    if (h1ref.current !== null) addElement();
  }, [moviesIds]);

  return (
    <>
      {!!moviesIds.length && moviesIds[0] !== null && (
        <ul className="movies-list">
          {moviesIds.map((Id) => {
            return (
              <div key={Id.id} className="movieListcontainer">
                <div className="movieimage">
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${Id.poster_path}`}
                    alt="Description"
                  />
                </div>
                <div className="content">
                  <h2>Title: {Id.original_title}</h2>
                  <p>Vote Count: {Id.vote_count}</p>
                  <p>Release Date: {Id.release_date}</p>
                  <button
                    className="listButton"
                    onClick={() => handleGetDetailsClick(Id)}
                  >
                    Get Details
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      )}
      {!moviesIds.length && <div ref={h1ref} className="notfound"></div>}
    </>
  );
};
export default MovieList;
