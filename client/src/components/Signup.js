// functional imports
import React, { useState, useContext } from "react";
import { LoggedUserContext } from "./LoggedUserContext";

// material and file imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  );
}


function Signup(){
  // variables for the rest of the file
  const defaultValues = {
    username: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    name: '',
    address: '',
    degree: '',
    logo: '',
    university: '',
    specialty: '',
  }

  // Assigns context and state
  const { setCurrentUser } = useContext(LoggedUserContext)
  const [form, setForm] = useState(defaultValues);

  const [errors, setErrors] = useState([]);

  //updates the form in state with user input
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Submits the new user information to the back end and sets the current user if validated
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user));
        
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
      setForm(defaultValues)
    });
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Sign up</h2>
      <label>
        <span>username:</span>
        <input
          required
          name='username'
          type='text'
          onChange={handleChange}
          value={form.username}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          name='password'
          type='password'
          onChange={handleChange}
          value={form.password}
        />
      </label>
      <label>
        <span>confirm password:</span>
        <input
          required
          name='password_confirmation'
          type='password'
          onChange={handleChange}
          value={form.password_confirmation}
        />
      </label>
      <button className='btn'>Sign up</button>
      {errors.map((error) => {
       return  <span key = {error} className='error'>{error}</span>;
      })}
    </form>
  );
};

export default Signup;