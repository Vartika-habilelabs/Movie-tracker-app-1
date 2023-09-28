import React, { useState } from "react";
import { MovieComponent } from "./Components/MovieComponent";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Wrapper from "./Components/Wrapper/wrapper";

const App = () => {
  const [moviesIds, setMoviesIds] = useState([null]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [icon, setIcon] = useState(0);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("localUser") || null)
  );
  const updateSearch = (arr) => {
    setMoviesIds(arr);
  };
  const setMovie = (movie) => {
    setSelectedMovie(movie);
  };
  const updateAuth = (val) => {
    setAuth(val);
  };
  const updateIcon = () => {
    setIcon((prev) => prev + 1);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!auth ? (
            <>
              <Route
                path="/login/*"
                element={<Login updateAuth={updateAuth} />}
              />
              <Route path="/*" element={<Signup />} />
            </>
          ) : (
            <>
              <Route
                path="/*"
                element={
                  <Wrapper
                    sendUpdateSearch={updateSearch}
                    setMovie={setMovie}
                    updateAuth={updateAuth}
                    icon={icon}
                    childComponent={MovieComponent}
                    childProps={{ setMovie, moviesIds, selectedMovie }}
                  />
                }
              />
              <Route
                path="/profile/*"
                element={
                  <Wrapper
                    sendUpdateSearch={updateSearch}
                    setMovie={setMovie}
                    updateAuth={updateAuth}
                    icon={icon}
                    childComponent={UserProfile}
                    childProps={{ updateIcon }}
                  />
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};
// dhs
export default App;
