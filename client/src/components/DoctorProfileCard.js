// functional imports
import React from 'react'

//material ui imports
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DoctorProfileCard({ doctor }) {

  const {
    user_info: {
      doctor: {
        id,
        name,
        degree,
        address,
        phone_number,
        specialty,
        university,
      },
    },
    username,
  } = doctor

  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Specializes in ${specialty}s`}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {address}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {phone_number}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Alma Mater: ${university}`}</Typography>
      </CardContent>
    </React.Fragment>
  )
}

export default DoctorProfileCard;  