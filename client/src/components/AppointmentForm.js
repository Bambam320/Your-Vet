//functional imports
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component and other imports
import { LoggedUserContext } from "./LoggedUserContext";

//material ui imports
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select, Button } from "@mui/material";


const AppointmentForm = () => {
  const defaultFormValues = {
    doctor_id: 0,
    animal_id: 0,
    location: '',
    time: '',
    concern: "",
    diagnosis: "",
    prognosis: "",
  }
  const { setAppointments, appointments, currentUser } = useContext(LoggedUserContext);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(defaultFormValues);
  const [animals, setAnimals] = useState([]);
  const [chosenAnimal, setChosenAnimal] = useState({ id: '' });
  let navigate = useNavigate()

  useEffect(() => {
    fetch('/animals')
      .then((response) => {
        if (response.ok) {
          response.json().then((animals) => {
            setAnimals(animals)});
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      });
  }, [])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleAnimalSelect(e) {
    let thisAnimal = animals.find((animal) => animal.id === e.target.value)
    console.log("thisAnimal", thisAnimal)
    setChosenAnimal(thisAnimal)
    setFormData({
      ...formData,
      animal_id: thisAnimal.id,
    });
  }

  function handleSubmit(e) {
    let newAppointment = {
      ...formData,
      doctor_id: currentUser.user_info.doctor.id
    }
    e.preventDefault();
    fetch("/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newAppointment) => {
  
          setAppointments([...appointments, newAppointment])});
          navigate('/appointments')
      } else {
        response.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const listAnimals = animals.map((animal) => {
    let id = animal.id
    return (
      <MenuItem key={id} value={id} >{`Patient ${animal.name}`}</MenuItem>
    )
  });


  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '80%' }}>
      <form style={{ margin: 'auto' }}>
        <label htmlFor="length">Select the patient:</label>
          <FormControl variant="standard" 
            style={{ 
              backgroundColor: 'white', 
              minWidth: 650 
            }}
          >
            <Select
              labelId="animal-select"
              id="animal-select"
              value={chosenAnimal.id}
              onChange={handleAnimalSelect}
              label="chosenAnimal"
            >
              <MenuItem value={chosenAnimal.id}> No Selection </MenuItem>
              {listAnimals}
            </Select>
          </FormControl>
          <label htmlFor='location'>Location:</label>
        <input
          type='text'
          id='location'
          value={formData.location}
          onChange={handleChange}
          />

        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          value={formData.time}
          onChange={handleChange}
        />
        <label htmlFor="concern">Concern:</label>
        <input
          type="text"
          id="concern"
          value={formData.concern}
          onChange={handleChange}
        />
        <label htmlFor="prognosis">Prognosis:</label>
        <input
          type="text"
          id="prognosis"
          value={formData.prognosis}
          onChange={handleChange}
        />
        <Button
        onClick={handleSubmit}
          variant="contained"
          sx={{
            marginLeft: '5em',
            marginTop: '1em',
            marginBottom: '1em',
          }}
          >
          Create!
        </Button>
          </form>
    </div>
  );
};

export default AppointmentForm;