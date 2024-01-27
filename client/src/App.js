import React from 'react'
import { Nav } from './Components/Navbar/Nav'
import { Home } from './Components/Home/Home'
import { Footer } from './Components/Footer/Footer'
import { About } from './Components/About/About'
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Signup } from './Components/Singup/Signup'
import { Todo } from './Components/Todo/Todo'
import { Login } from './Components/Login/Login'
import { Logout } from './Components/Logout.jsx/Logout'
import ErrorPage from './Components/ErrorPage/ErrorPage'

export const App = () => {
  return (
    <div>
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo/>} />
   
        <Route path="/signup" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  )
}

