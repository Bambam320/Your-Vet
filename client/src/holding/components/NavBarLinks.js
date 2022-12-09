//functional imports
import React from 'react';
import { Link } from 'react-router-dom';

function NavBarLinks () {
    return (
    <div>
      <Link className='linkFont' underline="hover" to="/">Home</Link>
      <Link className='linkFont' underline="hover" to="/faculty">Faculty</Link>
      <Link className='linkFont' underline="hover" to="/student">Student</Link>
      {/* <Link className='linkFont' underline="hover" to="/explore">Explore</Link> */}
      <Link className='linkFont' underline="hover" to="/login">Login</Link>
    </div>
  )
}

export default NavBarLinks;