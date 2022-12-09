import React from 'react'

const LoggedIn = ({user}) => {
  return (
    <div>{`Logged In: ${user.username}`}</div>
  )
}

export default LoggedIn