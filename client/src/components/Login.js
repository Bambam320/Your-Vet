//functional imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//component and other file imports
import '../login.css';

// from App
const Login = ({ onLogin }) => {
  // Providing state for login form and errors from backend and navigate from router dom
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // controls the login form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  console.log("errors", errors)

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("from login after fetch", user)
          onLogin(user)
          setTimeout(navigate("/appointments"), 500)
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
      {errors.map((error) => {
        return <span key = {error} className='error'>{error}</span>;
      })}
    </form>
  );
};

export default Login;