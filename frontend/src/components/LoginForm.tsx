import { useContext, useState } from "react"
import image1 from "../assets/images/shish-kebab.jpg"
import axios from "axios";
import { PageLayoutType, User, UserContext, UserContextType } from "../App";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContextType } from "./RecipePage";
import React from "react";

export default function LoginForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const pageLayout: PageLayoutType = useOutletContext();
    const userContext: UserContextType = React.useContext(UserContext) as UserContextType;


    const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //const response = await axios.get("http://localhost:8000/user/"+username+"?password="+password);
        const authUser = {
            username: btoa(username),
            password: btoa(password)
        }
        
        const response = await axios.post("http://localhost:8000/user/login", authUser);
        if (response.data.code == 200) {
            const data: User = response.data.data[0];
            if (data != undefined) {   
                userContext.updateCurrentUser(data);             
                setTimeout(()=> {                   
                    navigate("/home");
                }, 300);
                //navigate("/home");
                
            } else {

            }
        } else {
            //pageLayout.displayMessage(true, "Username/Password does not exist!");
            setMessage("Username/Password does not exist!");
        }
    }

    const  handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (localStorage.getItem('user') != "") {
            navigate("/home");
        } else {
            setUsername("");
            setPassword("");
            setMessage("");
        }
    }

    return (
        <>
            
            <div className="d-flex loginpage justify-content-center align-content-center">
                <div className="loginform rounded-4 align-self-center">
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="message">
                                    <p className="text-danger">{message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mb-3">
                                <h2>Enter your login information</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 m-1">
                                <label htmlFor="username" className="float-end">Username</label>                            
                            </div>
                            <div className="col-md m-1">
                                <input type="text" className="float-start" name="username" value={username}
                                    id="username" onChange={(e) => setUsername(e.currentTarget.value)}></input>                            
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 m-1">
                                <label htmlFor="password" className="float-end">Password</label>                            
                            </div>
                            <div className="col-md m-1">
                                <input type="password" className="float-start" name="password" value={password}
                                id="password" onChange={(e) => setPassword(e.currentTarget.value)}></input>                            
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col-md">
                                <div className="btn-grp ">
                                    <button type="submit" className="btn btn-primary me-2" disabled={username==""||password==""}
                                        onClick={handleSignIn}>
                                        Sign In
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>                                                      
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 m-1">
                                <h6>Not a registered user? Please <a href="/signup">sign up</a> for a new account</h6>                           
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    
        </>
        
    )
}