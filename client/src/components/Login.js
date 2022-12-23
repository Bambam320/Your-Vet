//functional imports
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUserContext } from "./LoggedUserContext";

//component and other file imports
import '../login.css';

// from App
const Login = () => {
  // Providing state for login form and errors from backend and navigate from router dom
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'Doctor',
  })
  const [errors, setErrors] = useState([]);
  const { setCurrentUser } = useContext(LoggedUserContext)
  const navigate = useNavigate();

  // controls the login form values
  const handleChange = (e) => {
    let name = e.target.name === 'role' ? 'role' : e.target.name
    let value = e.target.name === 'role' ? e.target.checked === true ? e.target.value : null : e.target.value
    setForm({
      ...form,
      [name]: value,
    });
  };

  //handles the login request to the backend and sets the current user and navigates to appointments if set correctly
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setTimeout(navigate("/appointments"), 500);
        });
      } else {
        console.log("the error is firing")
        res.json().then((err) => setErrors(err.errors));
      }
      setForm({
        username: '',
        password: ''
      })
    });
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Login</h2>
      {/* <FormControl>
        <RadioGroup
          style={{marginBottom: '-40px'}}
          name="role"
          value={form.role}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            key="Doctor"
            value="Doctor"
            control={<Radio size="small" />}
            label="Doctor"
          />
          <FormControlLabel
            key="Pet"
            value="Pet"
            control={<Radio size="small" />}
            label="Pet"
          />
        </RadioGroup>
      </FormControl> */}
      <label>
        <span>username:</span>
        <input
          required
          type='text'
          name='username'
          onChange={handleChange}
          value={form.username}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          name='password'
          onChange={handleChange}
          value={form.password}
        />
      </label>
      <button className='btn'>Login</button>
      <div>
        {errors.map((error) => {
          return <span key={error} className='error'>{error}</span>;
        })}
      </div>
    </form>
  );
};

export default Login;