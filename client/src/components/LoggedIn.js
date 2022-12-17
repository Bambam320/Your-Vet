import React from 'react'

const LoggedIn = ({currentUser}) => {

  return (
    <div style={{paddingTop: "1em", marginRight: '3em'}}>
      {currentUser.id ? 
        `Logged in as ${currentUser.role === "doc" ? 
          currentUser.user_info.doctor.name 
            : 
          "Pt. " + currentUser.user_info.animal.name}`
          :
        <></>}
    </div>
  )
}

export default LoggedIn