import React from 'react'

const LoggedIn = ({currentUser}) => {
  console.log(currentUser)
  return (
    <div style={{paddingTop: "1em", marginRight: '3em'}}>{`Logged in as ${currentUser.name}`}</div>
  )
}

export default LoggedIn