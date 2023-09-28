import React, { useState } from "react";
import img from "../Images/user.jpeg";
import "./UserProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({ updateIcon }) => {
  const user = JSON.parse(localStorage.getItem("localUser"));
  const [isDisabled, setIsDisabled] = useState(true);
  const [userName, setUserName] = useState(user.name);
  const [updatePasswordDisabled, setUpdatePasswordDisabled] = useState(true);
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const updateUserArray = () => {
    const localUser = JSON.parse(localStorage.getItem("localUser"));
    const newName = localUser.name;
    const newUser = {
      ...localUser,
      name: newName,
      password: JSON.parse(localStorage.getItem("localUser")).password,
    };
    const userArray = JSON.parse(localStorage.getItem("users"));
    const key = localUser.key;
    let newUserArray;
    for (let user of userArray) {
      if (user.key === key) {
        newUserArray = userArray.filter((item) => item !== user);
        break;
      }
    }
    newUserArray.push(newUser);
    localStorage.setItem("users", JSON.stringify(newUserArray));
  };

  const handleClick = () => {
    setIsDisabled(!isDisabled);
    if (!isDisabled) {
      updateIcon();
      updateUserArray();
    }
  };

  const handleUpdatePassword = () => {
    if (!updatePasswordDisabled) {
      if (
        JSON.parse(localStorage.getItem("localUser")).password !==
        updatePassword.oldPassword
      ) {
        toast.error("Incorrectly entered old password !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else if (
        updatePassword.newPassword !== updatePassword.confirmNewPassword ||
        updatePassword.newPassword === ""
      ) {
        toast.error("New password not matched !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else {
        toast.success("password updated successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const localUser = JSON.parse(localStorage.getItem("localUser"));
        const newUser = {
          ...localUser,
          password: updatePassword.newPassword,
        };
        localStorage.setItem("localUser", JSON.stringify(newUser));
        updateUserArray();
        setUpdatePassword({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    }
    setUpdatePasswordDisabled(!updatePasswordDisabled);
  };
  const handleChange = (e) => {
    const newName = e.target.value;
    setUserName(e.target.value);
    const localUser = JSON.parse(localStorage.getItem("localUser"));
    const newUser = {
      ...localUser,
      name: newName,
    };
    localStorage.setItem("localUser", JSON.stringify(newUser));
  };
  return (
    <>
      <div className="profilecontainer">
        <img src={img} alt="" />

        <div className="profiledata">
          <input
            disabled={isDisabled}
            type="text"
            value={userName}
            onChange={handleChange}
          />

          <input type="text" defaultValue={user.email} disabled />
          {!updatePasswordDisabled && (
            <>
              <input
                type="password"
                placeholder="Old password"
                value={updatePassword.oldPassword}
                onChange={(e) =>
                  setUpdatePassword({
                    ...updatePassword,
                    oldPassword: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="New password"
                value={updatePassword.newPassword}
                onChange={(e) =>
                  setUpdatePassword({
                    ...updatePassword,
                    newPassword: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Confirm New password"
                value={updatePassword.confirmNewPassword}
                onChange={(e) =>
                  setUpdatePassword({
                    ...updatePassword,
                    confirmNewPassword: e.target.value,
                  })
                }
              />
            </>
          )}
          <div className="profilebuttons">
            <button onClick={handleClick}>
              {isDisabled ? "Update Profile" : "Save Profile"}
            </button>
            <button onClick={handleUpdatePassword}>
              {updatePasswordDisabled ? "Update Password" : "Save Password"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default UserProfile;
