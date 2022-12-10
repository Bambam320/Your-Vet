//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { Link, Outlet } from 'react-router-dom'

//component and other file imports
import LoggedIn from './LoggedIn'
import '../navbar.css';

function Navbar({ handleLogout }) {
  //assigning variables and context
  const { currentUser } = useContext(LoggedUserContext)

  return (
    <>
      <div className='navbar'>
        <ul>
          <li className="logo">
            <img src={'https://i.pinimg.com/originals/b2/ba/9a/b2ba9a8c59456856e37ffa7fe6993093.jpg'} alt="pet" />
            <Link to="/">Vet & Grooming Services</Link>
          </li>
          <li>
            {currentUser ? <Link to="/appointments">My Appointments</Link> : <></>}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            {currentUser ? <LoggedIn currentUser={currentUser} /> : <></>}
          </li>
          <li>
            <button className='btn' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar;