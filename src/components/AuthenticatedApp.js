import CurrentTimebox from "./CurrentTimebox";
import InspirationalQuote from "./InspirationalQuote"
import Header from "./Header";
import React from "react";
import TimeboxesManager from "./TimeboxesManager";

function AuthenticatedApp(){
    return(
    <>
    <Header/>
    <CurrentTimebox title="Uczę się Reacta" totalTimeInMinutes={1}/>
    <TimeboxesManager/>
    <InspirationalQuote/>
    </>
    )
}

export default AuthenticatedApp;
