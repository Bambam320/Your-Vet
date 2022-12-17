//functional imports
import React, { useState,useContext } from "react";

//component and other imports
import { LoggedUserContext } from "./LoggedUserContext";

const AppointmentForm = () => {
  const { setAppointments, appointments } = useContext(LoggedUserContext);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    length: "0",
    description: "",
    poster_url: "",
    category: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormData(formData)
    setErrors([])
    fetch("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newMovie) => setMovies([...movies, newMovie]));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={formData.title}
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
  );
};