import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = ({ sendUpdateSearch, setMovie, updateAuth, icon }) => {
  const getFirstLetter = () => {
    const localUserJSON = localStorage.getItem("localUser");
    const localUser = JSON.parse(localUserJSON);
    const userName = localUser ? localUser.name : "";
    const firstLetter = userName.charAt(0).toUpperCase();
    return firstLetter;
  };
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [FirstLetter, setFirstLetter] = useState(getFirstLetter);
  const Navigate = useNavigate();

  //api calling function
  const apiCall = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c340ce9b56b005a778ba3d8b6eeda525&language=en-US&query=${search}&page=1&include_adult=false`
      )
      .then((res) => {
        const arr = res.data.results.map((result) => {
          setMovie(null);
          return result;
        });
        arr.sort((a, b) => b.vote_count - a.vote_count);
        if (!arr.length) setMovie(null);
        sendUpdateSearch(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFirstLetter(getFirstLetter);
    if(search.trim().length){
    const Id = setTimeout(() => {
      apiCall();
    }, 500);
   
    return () => {
      clearTimeout(Id);
    };
  }
  }, [search, icon]);

  const handleClick = () => {
    localStorage.setItem("localUser", null);
    updateAuth(false);
    sendUpdateSearch([null]);
    setMovie(null);
    Navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbarName">
        <h1 className="cursor logo"onClick={()=>Navigate("/")}>Movies Block</h1>
      </div>
      <div className="search-bar">
        {pathname === "/" && (
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
          />
        )}
        {pathname !== "/" && (
          <button
            className="logout"
            onClick={() => {
              Navigate("/");
            }}
          >
            Search movies
          </button>
        )}
        <button className="logout" onClick={handleClick}>
          Log Out
        </button>
        <button
          className="icon"
          onClick={() => {
            Navigate("/profile");
          }}
        >
          {FirstLetter}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
