import { useState } from "react";
import axios from "axios";
import { User, UserContext, UserContextType } from "../App";
import { useNavigate, useOutletContext } from "react-router-dom";
//import { OutletContextType } from "./RecipePage";
import React from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  //const pageLayout: PageLayoutType = useOutletContext();
  const userContext: UserContextType = React.useContext(
    UserContext
  ) as UserContextType;

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const authUser = {
      username: btoa(username),
      password: btoa(password),
    };

    const response = await axios.post(
      `${process.env.REACT_APP_RECIPE_API_URL}/user/login`,
      authUser
    );
    if (response.data.code == 200) {
      const data: User = response.data.data[0];
      if (data != undefined) {
        userContext.updateCurrentUser(data);
        setTimeout(() => {
          navigate("/home");
        }, 300);
        //navigate("/home");
      } else {
      }
    } else {
      //pageLayout.displayMessage(true, "Username/Password does not exist!");
      setMessage("Username/Password does not exist!");
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (localStorage.getItem("user") != "") {
      navigate("/home");
    } else {
      setUsername("");
      setPassword("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="d-flex loginpage justify-content-center align-items-center">
        <div className="loginform rounded-4  p-5">
          <form className="">
            <div className="row gy-5">
              <div className="col-md-12 col-sm-12 col-12 message">
                <p className="text-danger">{message}</p>
              </div>

              <div className="col-md-12 col-sm-12 col-12">
                <h3>Enter your login information</h3>
              </div>

              <div className="col-md-4 col-sm-4 col-4 mx-1">
                <label htmlFor="username" className="col-form-label ">
                  Username
                </label>
              </div>
              <div className="col-md-6 col-sm-6 col-6 mx-1">
                <input
                  type="text"
                  className="form-control "
                  name="username"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.currentTarget.value)}
                ></input>
              </div>

              <div className="col-md-4 col-sm-4 col-4 mx-1">
                <label htmlFor="password" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-md-6 col-sm-6 col-6 mx-1">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                ></input>
              </div>

              <div className="col-md-12 ">
                <div className="btn-grp ">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={username == "" || password == ""}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 m-1">
                <h6>
                  Not a registered user? Please <a href="/signup">sign up</a>{" "}
                  for a new account
                </h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
