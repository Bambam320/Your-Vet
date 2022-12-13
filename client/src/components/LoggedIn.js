import React from 'react'

const LoggedIn = ({currentUser}) => {
  return (
    <div style={{marginRight: '3em'}}>{`Logged in as ${currentUser.name}`}</div>
  )
}

export default LoggedIn