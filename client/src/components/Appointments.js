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

function Appointments({ currentUser }) {
  const [errors, setErrors] = useState([])
  const { appointments, setAppointments } = useContext(LoggedUserContext);

  useEffect(() => {
    fetch('/appointments')
      .then((res) => {
        if (res.ok) {
          res.json().then((appointments) => {
            setAppointments(appointments)
          });
        } else {
          res.json().then((err) => setErrors(err.error));
        }
      });
  }, [])

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
        </Button> : <></> }
      <Outlet />
      <section>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </section>
    </div>
  );
};

export default Appointments;