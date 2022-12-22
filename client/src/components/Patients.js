
import React, { useEffect, useContext, useState } from 'react';
import { LoggedUserContext } from './LoggedUserContext';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

function Patients() {
  const sortOptions = [
    { value: '', text: 'Select' },
    { value: 'name', text: 'Patient Name A-Z' },
    { value: 'dog', text: 'Type: Dog' },
    { value: 'cat', text: 'Type: Cat' },
    { value: 'bird', text: 'Type: Bird' },
    { value: 'horse', text: 'Type: Horse' },
    { value: 'age old', text: 'Age: Oldest first' },
    { value: 'age young', text: 'Age: Youngest first' },
  ]

  const { currentUser } = useContext(LoggedUserContext);
  const [animals, setAnimals] = useState([]);
  const [errors, setErrors] = useState([]);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [searchTerm, setSearchTerm] = useState('')
console.log(currentUser)
  useEffect(() => {
    setAnimals(currentUser.user_info.doctor.animals)
  }, [])

  const listAnimals = animals
    .filter((animal) => animal.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'age old': return b.age - a.age
        case 'age young': return a.age - b.age
        case 'name': return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        case 'dog': return a.classification === 'Dog' ? -1 : 1
        case 'cat': return a.classification === 'Cat' ? -1 : 1
        case 'bird': return a.classification === 'Bird' ? -1 : 1
        case 'horse': return a.classification === 'Horse' ? -1 : 1
        case '': return a.id - b.id
        default: return true
      }
    })
    .map((animal) => {
      const { age,
        breed,
        classification,
        color,
        disposition,
        existing_conditions,
        id,
        name,
        notes,
        sex
      } = animal
      return (
        <React.Fragment key={animal.id}>
          <Card sx={{ maxWidth: 400, margin: '2em' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Name: ${name}` }</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Breed: ${breed}` }</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Sex: ${sex}` }</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Disposition: ${disposition}` }</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Color: ${color}`}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Classification: ${classification}`}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Age: ${age}`}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Noted for patient ${id}: ${notes}`}</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `Pre-exisiting conditions: ${existing_conditions}`}</Typography>
          </CardContent>
          </Card >
        </React.Fragment>
      )
    })

  function handleChange(e) {
    setSearchTerm(e.target.value)
    console.log("e from appointmentform", e.target.value)
  }

  function handleSortChange(e) {
    setSortBy(e.target.value)
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <label
      > Search By Name:
        <br></br>
        {<input
          style={{ maxWidth: '30%', marginBottom: '1em' }}
          type='text'
          placeholder='search for a patient...'
          onChange={handleChange}
          value={searchTerm}
        ></input>}
      </label>
      <label>Filter By:</label>
      <select value={sortBy} onChange={handleSortChange} style={{marginBottom: '1em'}}>
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errors.map((error) => {
        return <span key={error} className='error'>{error}</span>;
      })}
      <br></br>
      <span >My Current Patients</span>
      <br></br>
      <div >{listAnimals}</div>
    </div>
  )
}

export default Patients;