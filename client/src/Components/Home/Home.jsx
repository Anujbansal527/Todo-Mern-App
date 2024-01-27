import React, { useEffect } from 'react'
import "./Home.css";
import { useAuth } from '../../Store/auth';



export const Home = () => {
  
  const {user,isLoggedIn} = useAuth()

  useEffect(()=>{

  },[isLoggedIn])
 
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column'>
            <h1>Don't let your tasks go unorganized, <br/>make a to-do list today!</h1>
            <br/>
            <h3>Welcome, {user.username} To Our WebSite</h3>
            <p>---------------------- Create To Do List With Us ----------------------</p>
            <br/>
            <button className='home-btn p-2 m-2.5'>Make Todo Now !!</button>
        </div>
    </div>
  )
}
