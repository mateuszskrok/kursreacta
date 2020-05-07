import React from "react";
import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext"

function getUserEmail(accessToken){
    const decoded = jwt.decode(accessToken)
    return decoded.email
}

function UserGreeting(){
    return(
        <AuthenticationContext.Consumer>{
            (accessToken) =>  <>Witaj {getUserEmail(accessToken)}</>
            }
        </AuthenticationContext.Consumer>
       
        )
}

export default UserGreeting;