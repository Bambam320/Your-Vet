// functional imports
import React, { useContext, useEffect, useState } from 'react'
import { LoggedUserContext } from './LoggedUserContext';
import { Link, Outlet } from 'react-router-dom'

//component imports
import AppointmentCard from './AppointmentCard';

//material ui imports
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

function Appointments() {
  //sets state from useContext
  const { currentUser, appointments } = useContext(LoggedUserContext);

  return (
    <div className='project-list'>
      {currentUser.role === 'doc' ?
        <Button
          component={Link}
          to="/appointments/new"
          variant="contained"
          sx={{
            marginLeft: '3em',
            marginTop: '-5em'
          }}
        >
          Create new Appointment
          <input hidden accept="image/*" multiple type="file" />
        </Button> : <></>}
      <Outlet />
      {!appointments?
      <></>
      :
      <section>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </section>}
    </div>
  );
};

export default Appointments;