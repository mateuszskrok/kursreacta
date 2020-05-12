import React from "react";
import UserGreeting from "./UserGreeting";
import AuthenticationContext from "../contexts/AuthenticationContext";


function Header(){
    return (
        <AuthenticationContext.Consumer>
            {({onLogout}) => (
                 <header className="header"> <UserGreeting/>
                 <a onClick={onLogout} href="/" className="header__logout-link">Wyloguj się</a>
                 </header> 
            )}
        </AuthenticationContext.Consumer>
             
    )
}

export default Header;
