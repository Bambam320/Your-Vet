// functional imports
import React, { useContext } from 'react'
import { LoggedUserContext } from './LoggedUserContext';

// material ui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Profile() {
  const { currentUser } = useContext(LoggedUserContext);

  const doctorCard = () => {
    console.log("current user from doctor card", currentUser)
    const {
      user_info: {
        doctor: {
          address = "default address",
          degree,
          id,
          logo,
          name = "N/A",
          phone_number,
          specialty,
          university
        },
      },
    } = currentUser
    return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {phone_number}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {specialty}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {degree}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    )
  }


  const animalCard = () => {
    console.log("current user from animal card", currentUser)
    const {
      user_info: {
        animal: {
          name,
          sex,
          breed,
          color,
          existing_conditions,
          notes,
          age,
          disposition,
          classification,
        },
      },
    } = currentUser

    return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {breed}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    )
  };

  return (
    <div>
      <Box sx={{ maxWidth: 350, margin: 'auto' }}>
        { currentUser && currentUser.role === 'doc' ?
          <Card variant="outlined">{doctorCard}</Card>
          :
          <Card variant="outlined">{animalCard}</Card>
        }
      </Box>
    </div>
  );

}

export default Profile;