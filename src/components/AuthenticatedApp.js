import EditableTimebox from "./EditableTimebox";
import InspirationalQuote from "./InspirationalQuote"
import Header from "./Header";
import React from "react";
import TimeboxesManager from "./TimeboxesManager";

function AuthenticatedApp(){
    return(
    <>
    <Header/>
    <EditableTimebox/>
    <TimeboxesManager/>
    <InspirationalQuote/>
    </>
    )
}

export default AuthenticatedApp;
