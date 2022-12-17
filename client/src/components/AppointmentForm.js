//functional imports
import React, { useState,useContext } from "react";

//component and other imports
import { LoggedUserContext } from "./LoggedUserContext";

//material ui imports
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const AppointmentForm = () => {
  const { setAppointments, appointments } = useContext(LoggedUserContext);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newAppointment) => setAppointments([...appointments, newAppointment]));
      } else {
        response.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '80%'}}>
   <form onSubmit={handleSubmit} style={{margin: 'auto'}}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={formData.name}
        onChange={handleChange}
      />
     <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            min="1888"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={handleChange}
          />
                    <label htmlFor="length">Length</label>
          <input
            type="number"
            id="length"
            value={formData.length}
            onChange={handleChange}
          />
                    <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
                    <label htmlFor="poster_url">Poster</label>
          <input
            type="text"
            id="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
          />
                    <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />
        {errors.length > 0 && (
    <ul style={{ color: "red" }}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )}
<button type="submit">Add Movie</button>

    </form>
    </div>
  );
};

export default AppointmentForm;