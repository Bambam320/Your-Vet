import React, { useEffect } from 'react'

function Patients() {

  useEffect(() => {
    fetch
  },  [])

  const [isClicked, setIsClicked] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const sortOptions = [
    {value: '', text: 'Select'},
    {value: 'User A-Z', text: 'User A-Z'},
    {value: 'Comment A-Z', text: 'Comment A-Z'},
    {value: 'Most upvotes', text: 'Most Upvotes'},
    {value: 'Most downvotes', text: 'Most Downvotes'}
  ]

  const [sortBy, setSortBy] = useState(sortOptions[0].value)

  function handleClick(event) {
    const name = event.target.name
    const value = parseInt(event.target.value) + 1
    const id = parseInt(event.target.id)
    const newComments = data.comments.map((comment) => comment.id === id ? {...comment, [name]: value} : comment)
    setData({...data, comments: newComments})
  }

  const comments = data.comments
  .filter((comment) => comment.user.includes(searchTerm) || comment.comment.includes(searchTerm))
  .sort((a,b) => {
    switch (sortBy) {
      case 'Most upvotes' : return b.upvotes - a.upvotes
      case 'Most downvotes' : return b.downvotes - a.downvotes
      case 'User A-Z' : return a.user.toLowerCase() > b.user.toLowerCase() ? 1 : -1
      case 'Comment A-Z' : return a.comment.toLowerCase() > b.comment.toLowerCase() ? 1 : -1
      case '' : return a.id - b.id
      default: return true
    }
  })
  .map((comment) => {
    return (
      <React.Fragment key={comment.id}>
        <strong >{comment.user}</strong>
        <p>{comment.comment}</p>
        <button 
          onClick={handleClick} 
          name='upvotes' 
          value={comment.upvotes}
          id={comment.id}
        >{comment.upvotes} 👍</button>
        <button 
          onClick={handleClick} 
          name='downvotes' 
          value={comment.downvotes}
          id={comment.id}
        >{comment.downvotes} 👎</button>
        <p></p>
        <button
          onClick={handleDelete}
          name='delete'
          value={comment.id}
        >Delete This Comment</button>
        <p></p>
      </React.Fragment>
    )
  })


  return (
    <div>
      <span>My Current Patients</span>
    </div>
  )
}

export default Patients;