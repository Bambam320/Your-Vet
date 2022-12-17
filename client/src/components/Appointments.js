// functional imports
import React, { useContext, useEffect, useState } from 'react'
import { LoggedUserContext } from './LoggedUserContext';

//component imports
import AppointmentCard from './AppointmentCard';

function Appointments() {
  const [errors, setErrors] = useState([])
  const { appointments, setAppointments } = useContext(LoggedUserContext);

  useEffect(() => {
    fetch('/appointments')
      .then((res) => {
        if (res.ok) {
          res.json().then((appointments) => {
            console.log(appointments)
            setAppointments(appointments)});
        } else {
          res.json().then((err) => setErrors(err.error));
        }
      });
  }, [])

  console.log("appointments", appointments)
  return (
    <div className='project-list'>
      <section>
        {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </section>
    </div>
  );
};

export default Appointments;