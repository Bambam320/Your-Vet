// functional imports
import React from 'react'

//material ui imports
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function AnimalProfileCard({ animal }) {

  const {
    user_info: {
      animal: {
        id,
        name,
        sex,
        breed,
        color,
        age,
        disposition,
        classification
      },
    },
    username,
  } = animal

  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Username: ${username}`}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Animal tracker Id: ${id}`}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Name: ${name}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Sex: ${sex}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Breed: ${breed}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Color: ${color}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Age: ${age}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Disposition: ${disposition}`}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Classification: ${classification}`}</Typography>
      </CardContent>
    </React.Fragment>
  )
}

export default AnimalProfileCard;