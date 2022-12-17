//functional imports
import React, { useEffect, useState } from 'react'

//component imports
import DoctorProfileCard from './DoctorProfileCard';
import AnimalProfileCard from './AnimalProfileCard';

//material ui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function AllProfileCard({ currentUser }) {
  const [doctorUsers, setDoctorUsers] = useState([]);
  const [animalUsers, setAnimalUsers] = useState([]);
  const [errors, setErrors] = useState([]);

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

  let doctors = doctorUsers.map((doctor) => {
    return (
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        <Card variant="outlined">
          <DoctorProfileCard doctor={doctor} key={doctor.id} />
        </Card>
      </Box>
    )
  })

  let animals = animalUsers.map((animal) => {
    return (
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        <Card variant="outlined">
          <AnimalProfileCard animal={animal} key={animal.id} />
        </Card>
      </Box>
    )
  })

  console.log("doctor", doctorUsers)
  console.log("animal", animalUsers)

  return (
    <div>
      {currentUser.role === 'doc' ?
        doctors : animals
      }
    </div>
  )
}

export default AllProfileCard;