//functional imports
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

//component imports
import DoctorProfileCard from './DoctorProfileCard';
import AnimalProfileCard from './AnimalProfileCard';

//material ui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function AllProfileCard({ currentUser }) {
  //assigning state
  const [doctorUsers, setDoctorUsers] = useState([]);
  const [animalUsers, setAnimalUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  //fetching all users associated to a doctor or an animal
  useEffect(() => {
    fetch("/users")
      .then((res) => {
        if (res.ok) {
          res.json().then((allUsers) => {
            if (currentUser.role === 'doc') {
              setDoctorUsers(allUsers)
            } else {
              setAnimalUsers(allUsers)
            }
          })
        } else {
          res.json().then((err) => setErrors(err.error));
        }
      })
  }, [errors])

  //mapping over the doctors and listing each one through DoctorProfileCard
  let doctors = doctorUsers.map((doctor) => {
    return (
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        <Card variant="outlined">
          <DoctorProfileCard doctor={doctor} key={doctor.id} />
        </Card>
      </Box>
    )
  })

  //mapping over the animals and listing each one through AnimalProfileCard
  let animals = animalUsers.map((animal) => {
    return (
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        <Card variant="outlined">
          <AnimalProfileCard animal={animal} key={animal.id} />
        </Card>
      </Box>
    )
  })

  //rendering the correct card based on the logged in user
  return (
    <div>
      {currentUser.role === 'doc' ?
        doctors : animals
      }
      <Outlet/>
    </div>
  )
}

export default AllProfileCard;