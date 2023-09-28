import React from "react";
import Navbar from "../Navbar/Navbar";
import './wrapper.css'
const Wrapper = ({
  childComponent: Children,
  childProps,
  sendUpdateSearch,
  setMovie,
  updateAuth,
  icon,
}) => {
  return (
    <div className="root">
      <Navbar
        sendUpdateSearch={sendUpdateSearch}
        setMovie={setMovie}
        updateAuth={updateAuth}
        icon={icon}
      />
      <Children {...childProps} />
    </div>
  );
};

export default Wrapper;
