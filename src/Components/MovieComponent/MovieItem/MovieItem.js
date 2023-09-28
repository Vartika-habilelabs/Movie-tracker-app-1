import React, { useEffect, useState } from "react";
import axios from "axios";
const MovieItem = ({ movie }) => {
const [details,setDetails]=useState([]);

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=c340ce9b56b005a778ba3d8b6eeda525&language=en-US`)
        .then((res)=>{
            setDetails(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    },[movie])
  return (
    <div className="movie-details">
      <div className="movie-image">
        <img className="singleImage"
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${details.poster_path}`}
          alt="Movie Poster"
        />
      </div>
      <div className="movie-info">
        <h1 className="name">{details.original_title}</h1>
        <p className="subname"><strong>Status:</strong> {details.status}</p>
        <p className="subname"><strong>Release Date:</strong> {details.release_date}</p>
        <p className="subname"><strong>Vote Count: </strong>{details.vote_count}</p>
        <p className="subname"><strong>Revenue: </strong>{details.revenue}</p>
        <p className="subname"><strong>Popularity: </strong>{details.popularity}</p>
        <p className="subname"><strong>Tagline: </strong>{details.tagline}</p>
        <p className="subname"><strong>Overview: </strong>{details.overview}</p>
        
      </div>
    </div>
  );
};

export default MovieItem;
