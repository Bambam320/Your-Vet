import React,{useState,useContext, useEffect} from 'react'
import { MyContext } from "./MyContext";

function AppointmentCardUpdate({ review, changeToggle }) {
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    title:"",
    comment:"",
  rating:0});
  const { setReviews, reviews } = useContext(MyContext);

   useEffect(()=>{
    setForm(review)
  },[review])
  
  
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((review) => {
          const updatedReviews = reviews.map((rev) => {
             if(rev.id === review.id) {
              return review
             } else {
              return rev
             }
        })
        setReviews(updatedReviews)
        })
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    });
    changeToggle()
  }
  function handleCancel() {
    changeToggle()
  }


  return (
    <>
    <div>{`${review.title}`}</div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Update title:</span>
          <textarea
            style={{ minHeight: "10px", maxWidth: "40em" }}
            onChange={handleChange}
            name='title'
            value={form.title}
          ></textarea>
          <span>Update new review:</span>
          <textarea
            onChange={handleChange}
            value={form.comment}
            name='comment'
          ></textarea>
          {/* Stretch Goal make stars */}
          <span>Update rating:</span>
          <textarea
            style={{ minHeight: "10px", maxWidth: "10em" }}
            onChange={handleChange}
            name='rating'
            value={form.rating}
          ></textarea>
        </label>
        <button className='btn'>Update Review</button>
        {errors.map((error) => {
        return (
          <span key={error} className='error'>
            {error}
          </span>
        );
      })}
        <button className='btn' onClick={handleCancel}>Cancel</button>

      </form>
    </>
  )
}

export default AppointmentCardUpdate;