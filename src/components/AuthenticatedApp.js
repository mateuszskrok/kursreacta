import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Header from "./Header";
import React from "react";

function AuthenticatedApp({onLogout, accessToken}){
    return(
    <>
    <Header onLogout={onLogout}/>
    <TimeboxList/>
    <EditableTimebox/>
    </>
    )
}

export default AuthenticatedApp;
