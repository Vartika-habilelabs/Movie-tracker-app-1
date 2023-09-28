import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ updateAuth }) => {
  const Navigate = useNavigate();

  const [confirmUserData, setConfirmUserData] = useState({
    email: "",
    password: "",
  });

  const credentialsExist = (users) => {
    for (let i = 0; i < users.length; i++) {
      if (
        confirmUserData.email === users[i].email &&
        confirmUserData.password === users[i].password
      )
        return users[i];
    }
    return null;
  };

  const handleClick = () => {
    const users =
      JSON.parse(
        localStorage.getItem("users") ? localStorage.getItem("users") : null
      ) || [];

    if (users.length) {
      const localUser = credentialsExist(users);
      if (localUser) {
        localStorage.setItem("localUser", JSON.stringify(localUser));
        updateAuth(true);
        toast.success("Logged in up successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        Navigate("/");
      } else {
        toast.error("Invalid credentials !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return (
    <>
      <div className="signupcontent">
        <h1>Movies Block</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setConfirmUserData({ ...confirmUserData, email: e.target.value })
            }
            type="text"
            id="email"
            value={confirmUserData.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setConfirmUserData({
                ...confirmUserData,
                password: e.target.value,
              })
            }
            type="password"
            id="password"
            value={confirmUserData.password}
          />
        </div>
        <button onClick={handleClick} className="signupbtn">
          Login
        </button>
        <div className="cursor" onClick={() => Navigate("/")}>
          Don't have an account?
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
