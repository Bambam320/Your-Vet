import React from 'react'

const LoggedIn = ({currentUser}) => {
  //sets the logged in users name at the top of the page
  return (
    <div style={{paddingTop: "1em", marginRight: '3em'}}>
      {currentUser.id > 0 ? 
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