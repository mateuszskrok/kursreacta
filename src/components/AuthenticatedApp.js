import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import InspirationalQuote from "./InspirationalQuote"
import Header from "./Header";
import React from "react";

function AuthenticatedApp(){
    return(
    <>
    <Header/>
    <EditableTimebox/>
    <TimeboxList/>
    <InspirationalQuote/>
    </>
    )
}

export default AuthenticatedApp;
