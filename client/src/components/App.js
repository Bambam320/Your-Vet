//functional imports
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoggedUserContext } from './LoggedUserContext'

//component and other file imports
import Navbar from './Navbar.js';
import Login from './Login.js';
import Home from './Home.js';
import Signup from "./Signup.js"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  
  // fetch on render to auto-login
  useEffect(() => {
    fetch("/me").then((r) => {
      r.ok ? r.json().then((user) => setCurrentUser(user)) : setCurrentUser(null);
    });
  }, []);

  //passed back from Navbar and removes the current user for logout
  function handleLogout(){
    fetch("/logout", {method:"DELETE"})
    .then((res) =>{
      if (res.ok){
        setCurrentUser(null)
      }
    })
  }

  //provides context to and route to entire app
  return (
    <LoggedUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/" element={<Navbar handleLogout={handleLogout} />}>
            <Route index path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="faculty/*" element={<Faculty />} /> //root for faculty tree
            <Route path="student/*" element={<Student />} />
       
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} /> */}
          </Route>
        </Routes>
    </LoggedUserContext.Provider>
  )
}

export default App;