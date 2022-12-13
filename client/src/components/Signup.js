// functional imports
import React, { useState, useContext } from "react";
import { LoggedUserContext } from "./LoggedUserContext";

// material and file imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Signup() {
  const ConsoleLog = ({children}) => {
    console.log(children);
    return false
  }

  // variables for the rest of the file
  const defaultDoctorValues = {
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
  const defaultPetValues = {
    username: '',
    password: '',
    password_confirmation: '',
    name: '',
    sex: '',
    breed: '',
    color: '',
    existing_conditions: '',
    age: null,
    disposition: '',
    classification: '',
  }

  // Assigns context and state
  const { setCurrentUser } = useContext(LoggedUserContext)
  const [doctorForm, setDoctorForm] = useState(defaultDoctorValues);
  const [petForm, setPetForm] = useState(defaultPetValues);
  const [errors, setErrors] = useState([]);
  const [alignment, setAlignment] = useState('doc');

  let formToDisplay = alignment === 'doc' ? doctorForm : petForm
  // console.log("just before display form triggers")
  let displayForm = Object.entries(formToDisplay).map((entry, i) => {
    // console.log("label return firing")
    // console.log("formto display from inside display form", formToDisplay)
    return (
      <label key={i}>
        <span>{`${entry[0]}:`}</span>
        <ConsoleLog>{alignment}</ConsoleLog>
        <ConsoleLog>{entry[1]}</ConsoleLog>
        
        <input
          required
          name={`${entry[0]}`}
          type={`${entry[0]}`}
          onChange={(e) => handleFormChange(e)}
          value={entry[1]}
        />
      </label>
    )
  })

  // updates the form in state with user input
  function handleFormChange(e) {
    if (alignment === 'doc') {
      console.log("if is firing")
      setDoctorForm({
        ...doctorForm,
        [e.target.name]: e.target.value,
      });
    } else {
      console.log("else is firing")
      setPetForm({
        ...petForm,
        [e.target.name]: e.target.value,
      })
    }
  }

  // console.log("doctordoctordoctordoctor", doctorForm)
  // console.log("petpetpetpetpetpetpetpet", petForm)



  // Submits the new user information to the back end and sets the current user if validated
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(form),
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((user) => setCurrentUser(user));

  //     } else {
  //       res.json().then((err) => setErrors(err.errors));
  //     }
  //     setForm(defaultValues)
  //   });
  // }



  //updates the state for type of user that wants to login
  function handleToggleChange(e, newAlignment) {
    setAlignment(newAlignment);
  };

  return (
    // onSubmit={handleSubmit} 
    <form className='auth-form'>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton value="doc">Doctor login</ToggleButton>
        <ToggleButton value="pet">Pet login</ToggleButton>
      </ToggleButtonGroup>
      <h2>Sign up</h2>
      {/* <label>
        <span>username:</span>
        <input
          required
          name='username'
          type='text'
          onChange={handleFormChange}
          value={form.username}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          name='password'
          type='password'
          onChange={handleFormChange}
          value={form.password}
        />
      </label> */}
      {displayForm}
      <button className='btn'>Sign up</button>
      {errors.map((error) => {
        return <span key={error} className='error'>{error}</span>;
      })}
    </form>
  );
};

export default Signup;