//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { Link, Outlet } from 'react-router-dom'

//component and other file imports
import LoggedIn from './LoggedIn'
import '../navbar.css';
import Login from './Login';

// from App.js
function Navbar({ handleLogout }) {
  //assigning variables and context
  const { currentUser } = useContext(LoggedUserContext)

console.log(currentUser)
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
              <div className="link">
                <Link to="/profile">My Profile</Link>
                <Link to="/appointments">My Appointments</Link>
                {currentUser.role ==='doc' ?
                  <Link to="/patients">My Patients</Link>
                :
                  <></>
                }
                <LoggedIn currentUser={currentUser} />
              </div>
              :
              <div>
                <Link to="/login">Login</Link>
                <Link to="/users/new">Signup</Link>
              </div>
            }
          </li>
          <li>
            {!currentUser ? <></> : <button className='btn' onClick={handleLogout}>Logout</button>}
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar;

