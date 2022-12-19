// functional imports
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUserContext } from "./LoggedUserContext";

// material and file imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Signup() {
  //for troubleshooting the displayForm render function
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
    age: 0,
    disposition: '',
    classification: '',
  }

  // Assigns hooks
  const { setCurrentUser } = useContext(LoggedUserContext)
  const [doctorForm, setDoctorForm] = useState(defaultDoctorValues);
  const [petForm, setPetForm] = useState(defaultPetValues);
  const [errors, setErrors] = useState([]);
  const [alignment, setAlignment] = useState('doc');
  const navigate = useNavigate()

  //lists the correct type of input based on the type from entry
  function listType(entry) {
    switch(entry[0]) {
      case 'password_confirmation': return 'password'
      case 'password': return 'password'
      case 'age' : return 'number'
      case 'color' : return 'text'
      default : return 'text'
    }
  }
  //set form to either doctor or pet style from state
  let formToDisplay = alignment === 'doc' ? doctorForm : petForm
  //
  let displayForm = Object.entries(formToDisplay).map((entry, i) => {
    return (
      <label key={i}>
        {/* <ConsoleLog>{entry[1]}</ConsoleLog> */}
        <input
          //might try a ternary to require only certain attributes
          required
          name={`${entry[0]}`}
          type={listType(entry)}
          onChange={(e) => handleFormChange(e)}
          //check how to display color value if selected through a controlled form
          value={entry[1]}
          placeholder={entry[0]}
        />
      </label>
    )
  })

  // updates the form in state with user input based on doctor or pet type
  function handleFormChange(e) {
    if (alignment === 'doc') {
      setDoctorForm({
        ...doctorForm,
        [e.target.name]: e.target.value,
      });
    } else {
      setPetForm({
        ...petForm,
        [e.target.name]: e.target.value,
      })
    }
  };

  // Submits the new user information to the back end and sets the current user if validated
  function handleSubmit(e) {
    e.preventDefault();
    // let userType = alignment === 'doc' ? '/users/new' : '/user/new'
    let formType = alignment === 'doc' ? doctorForm : petForm
    fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formType, role: alignment}),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("useruseruser", user)
          setCurrentUser(user)});
        navigate("/appointments")
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
      setDoctorForm(defaultDoctorValues)
      setPetForm(defaultPetValues)
    });
  }



  //updates the state for type of user that wants to signup
  function handleToggleChange(e, newAlignment) {
    setAlignment(newAlignment);
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton value="doc" disabled={alignment === 'doc' ? true : false}>Doctor signup</ToggleButton>
        <ToggleButton value="pet" disabled={alignment === 'doc' ? false : true}>Pet signup</ToggleButton>
      </ToggleButtonGroup>
      <h2 style={{marginTop: "20px"}}>{alignment ==='doc' ? "Welcome Doctor" : "Woof, Meow, Chirp and Whinny!"}</h2>
      {displayForm}
      <button className='btn'>Sign Up!</button>
      {errors.map((error) => {
        return <span key={error} className='error'>{error}</span>;
      })}
    </form>
  );
};

export default Signup;