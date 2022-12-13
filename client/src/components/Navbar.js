//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { Link, Outlet } from 'react-router-dom'

//component and other file imports
import LoggedIn from './LoggedIn'
import '../navbar.css';

// from App.js
function Navbar({ handleLogout }) {
  //assigning variables and context
  const { currentUser } = useContext(LoggedUserContext)

  return (
    <>
      <div className='navbar'>
        <ul>
          <li className="logo">
            <Link to="/">
              <img src={'https://i.pinimg.com/originals/b2/ba/9a/b2ba9a8c59456856e37ffa7fe6993093.jpg'} alt="pet" />
              Vet & Grooming Services
            </Link>
          </li>
          <li>
            {currentUser ? 
              <div>
                <Link to="/appointments">My Appointments</Link>
                <Link to="/patients">My Patients</Link> 
                <LoggedIn currentUser={currentUser} />
              </div>
            : 
              <div>
                <Link to="/">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            }
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