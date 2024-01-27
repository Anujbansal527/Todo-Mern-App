import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from "../../Store/auth";

export const Signup = () => {

  const [user,setUser] = useState({email:"",password:"",username:""})

  const navigate = useNavigate();

  const {setTokenInLocalStorage} = useAuth();

  const ValueChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }

  const submitUser = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json()
      if (response.ok) {
        toast.success(res_data.msg)
        
        console.log(res_data)
        
        setTokenInLocalStorage(res_data.token);
        
        setUser({email:"",password:"",username:""});
      
        navigate("/");
      } else {
        toast.error(res_data.msg)
      }
  }
  catch(error)
  {
    console.log(error)
  }
  }

  return (
    <div className="signup">
    <ToastContainer/>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="grid grid-two-cols d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="Email p-2 my-3"
                name="email"
                id="email"
                value={user.email}
                onChange={(e)=>{ValueChange(e)}}
              />

              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter Your Username"
                className="Username p-2 my-3"
                name="username"
                id="username"
                value={user.username}
                onChange={(e)=>{ValueChange(e)}}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="Password p-2 my-3"
                name="password"
                id="password"
                value={user.password}
                onChange={(e)=>{ValueChange(e)}}
              />

              <div className="d-flex btn-group">
                  <button className="btn primary-btn" onClick={submitUser}>Signup</button>

                <a href="/login">
                  <button className="btn secondary-btn">Login</button>
                </a>
              
              </div>
            </div>
          </div>

          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <h1 className="text-center sign-head">
              Signup Here !! <br /> {"<----"}{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
