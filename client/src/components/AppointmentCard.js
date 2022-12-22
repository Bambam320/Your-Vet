// functional imports
import React, { useState, useContext } from 'react'

//material imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LoggedUserContext } from './LoggedUserContext';

//component imports
import AppointmentCardUpdate from './AppointmentCardUpdate';

function AppointmentCard({ appointment }) {
  const [updateToggle, setUpdateToggle] = useState(false);
  const [errors, setErrors] = useState([])
  const { currentUser, setAppointments, appointments } = useContext(LoggedUserContext)

  // const { a}
  function onUpdateToggle() {
    setUpdateToggle(!updateToggle);
  }

console.log("appointment from appointment card", appointment)
  
  const {
    id,
    time,
    location,
    concern,
    diagnosis
  } = appointment
  let animalName = currentUser.user_info.doctor.animals.find((animal) => animal.id === appointment.animal_id).name
  let doctorName = currentUser.user_info.doctor.name

  function handleDeleteClick(e) {
    e.preventDefault();
    fetch(`/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.ok) {
          const newAppointments = appointments.filter((app) => app.id !== id);
          setAppointments(newAppointments);
      } else {
        res.json().then((err) => {
          console.log("error", err)
          setErrors(err.errors)});
      }
    });
  }

  function onUpdateToggle() {
    setUpdateToggle(!updateToggle);
  }

  const card = (
    <React.Fragment>
      <CardContent>
      {updateToggle ? (
        <AppointmentCardUpdate 
          appointment={appointment} 
          setErrors={setErrors}
          changeToggle={onUpdateToggle} 
        />
      ) : (
        <></>
      )}
        <Typography variant="h5" component="div" gutterBottom>
          {`Appointment with ${doctorName} for ${animalName}`}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`The appointment is scheduled for ${time}.`}</Typography>

        <Typography variant="body2" gutterBottom>
          {`Located at ${location}.`}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {` Patient concern: ${concern}`}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {` Patient diagnosis: ${diagnosis}`}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={onUpdateToggle}>Update This appointment!</Button>
        <Button 
          variant="contained" 
          size="small" 
          sx={{color: 'black', backgroundColor: 'red'}} 
          onClick={handleDeleteClick}
        >
            Delete this appointment!
        </Button>
      </CardActions>
      <CardContent>
        {errors.map((error) => {
          return (
            <span key={error} className='error'>
              {error}
            </span>
          );
        })}
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ maxWidth: 450, margin: 'auto', marginBottom: '1em' }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default AppointmentCard;