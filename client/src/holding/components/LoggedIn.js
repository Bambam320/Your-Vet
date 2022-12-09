//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { useNavigate } from 'react-router-dom'

//material imports
import Button from '@material-ui/core/Button';


function LoggedIn() {
  //uses context and navigate hook
  const { currentUser, setCurrentUser } = useContext(LoggedUserContext);
  const navigate = useNavigate();

  //On logout the currentuser state is removed and the user is navigated home
  const handleLogout = () => {
    setCurrentUser('')
    navigate('/')
  }

  //returns a text with login info and logout button if the user is valid
  return (
    <>
      {currentUser ?
        <div>
          <p style={{
            display: 'inline-block',
            marginRight: '10px',
            color: '#ffe6cc'
          }}
          >{`Logged in as ${currentUser.role.substr(0, 1).toUpperCase()}${currentUser.role.substr(1)} ${currentUser.username}`}</p>
          <Button
            onClick={handleLogout}
            style={{
              display: 'inline-block',
              margin: '10px',
              color: 'white',
              backgroundColor: 'darkblue'
            }}
          >Logout</Button>
        </div>
        : null}
    </>
  )
}

export default LoggedIn;