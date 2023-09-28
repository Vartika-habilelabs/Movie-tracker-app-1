import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    key: 0,
  });

  const Navigate = useNavigate();

  const checkUser = () => {
    if (!JSON.parse(localStorage.getItem("users"))) return false;
    const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    for (let user of users) {
      if (user.email === userData.email) return true;
    }
    return false;
  };
  const handleClick = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userData.email
      )
    ) {
      toast.error("Invalid email !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else if (checkUser()) {
      toast.error("User already exists !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      const localStorageUsers = localStorage.getItem("users");
      const userArray =
        JSON.parse(localStorageUsers ? localStorageUsers : null) || [];
      if (userData.confirmPassword === userData.password) {
        const user = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          key: userArray.length + 1,
        };
        userArray.push(user);
        localStorage.setItem("users", JSON.stringify(userArray));
        toast.success("Signed up successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        Navigate("/login");
      } else
        toast.error("Password not matched !", {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  };
  return (
    <>
      <div className="signupcontent">
        <h1>Movies Block</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            value={userData.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="text"
            value={userData.email}
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            type="password"
            value={userData.password}
          />
        </div>
        <div>
          <label htmlFor="name">Confirm Password</label>
          <input
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            type="password"
            value={userData.confirmPassword}
          />
        </div>
        <button onClick={handleClick} className="signupbtn">
          Signup
        </button>
        <div className="cursor" onClick={() => Navigate("/login")}>
          Already have an account?
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Signup;
