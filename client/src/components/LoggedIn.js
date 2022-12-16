import React from 'react'

const LoggedIn = ({currentUser}) => {
  console.log("current user from logged in", currentUser)
  return (
    <div style={{paddingTop: "1em", marginRight: '3em'}}>
      {`Logged in as ${currentUser.user_info_type === "Doctor" ? 
        "Dr. " + currentUser.user_info.doctor.name : "Pt. " + currentUser.user_info.animal.name}`}
    </div>
  )
}

export default LoggedIn