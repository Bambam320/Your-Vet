//functional imports
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoggedUserContext } from './LoggedUserContext'

//component imports
import Navbar from './Navbar.js';
import Login from './Login.js';
import Signup from "./Signup.js";
import Appointments from './Appointments';
import Patients from './Patients';
import Home from './Home';
import Profile from './Profile';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  // fetch on render to auto-login
  useEffect(() => {
    fetch("/me").then((r) => {
      r.ok ? r.json().then((user) => setCurrentUser(user)) : setCurrentUser(null);
    });
  }, []);

  //passed back from Navbar and removes the current user for logout
  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCurrentUser(null)
          navigate('/login')
        }
      })
  }

  // sets current user with the valid login return object
  function onLogin(user) {
    setCurrentUser(user)
  }

  //provides context to and route to entire app
  return (
    <LoggedUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Navbar handleLogout={handleLogout} />}>
          <Route index element={<Login onLogin={setCurrentUser} />} />
          <Route path="home" element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="users/new" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </LoggedUserContext.Provider>
  )
}

export default App;