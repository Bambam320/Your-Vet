//functional imports
import React, {useState} from "react";

//component and other file imports
import '../login.css';

const Login = ({setUser}) => {
  const[username,setUserName] = useState('')
  const [password, setPassword] =useState('')
  const [errors, setErrors] = useState([]);
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user)
          setUser(user)});
        
      } else {
        res.json().then((err) => setErrors(err.error));
      }
      setUserName("")
      setPassword("")
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
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button className='btn'>Login</button>
      {errors.map((error) => {
       return  <span key = {error} className='error'>{error}</span>;
      })}
    </form>
    
  );
};

export default Login;