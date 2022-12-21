//functional imports
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoggedUserContext } from './LoggedUserContext'

//component imports
import Navbar from './Navbar.js';
import Login from './Login.js';
import Signup from "./Signup.js";
import Appointments from './Appointments';
import AppointmentForm from './AppointmentForm';
import Patients from './Patients';
import Home from './Home';
import Profile from './Profile';
import AllProfileCard from './AllProfileCard'

function App() {
  const defaultValues = {
    id: 0,
    role: '',
    user_info: {
      doctor: {
        name: ''
      },
      animal: {
        name: ''
      }
    }
  }
  const [currentUser, setCurrentUser] = useState(defaultValues)
  const [appointments, setAppointments] = useState([])
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
          setCurrentUser(defaultValues)
          navigate('/')
        }
      })
  }

  // sets current user with the valid login return object
  function onLogin(user) {
    setCurrentUser(user)
  }

  console.log(currentUser)

  //provides context to and route to entire app
  return (
    <LoggedUserContext.Provider value={{ currentUser, setCurrentUser, appointments, setAppointments }}>
      <Routes>
        <Route path="/" element={<Navbar handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="appointments/" element={<Appointments currentUser={currentUser} />} >
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="users/" element={<AllProfileCard currentUser={currentUser} />} >
            <Route path="new" element={<Signup />} />
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="patients" element={<Patients />} />
          {currentUser ? <Route path="profile" element={<Profile />} /> : <React.Fragment>Loading</React.Fragment>}
        </Route>
      </Routes>
    </LoggedUserContext.Provider>
  )
}

export default App;