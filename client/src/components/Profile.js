// functional imports
import React, { useState, useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { Link, Outlet } from 'react-router-dom'

// component imports
import DoctorProfileCard from './DoctorProfileCard';
import AnimalProfileCard from './AnimalProfileCard';

//material ui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function Profile() {
  const { currentUser } = useContext(LoggedUserContext);

  //returns the currently logged in users profile
  return (
    <div>
      <Box
        variant="outlined"
        sx={{
          maxWidth: 350,
          margin: 'auto',
          marginTop: '-50px',
          marginBottom: '25px'
        }}
      >
        <Link to="/users/">View {`${currentUser.role === 'doc' ? 'Colleagues' : 'Friends'}`}</Link>
      </Box>
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        <Card variant="outlined">
          {currentUser.role === 'doc' ?
            <DoctorProfileCard doctor={currentUser} />
            :
            currentUser.role === 'pet' ?
              <AnimalProfileCard animal={currentUser} />
              :
              <></>
          }
        </Card>
      </Box>
      <Outlet />
    </div>
  );

}

export default Profile;