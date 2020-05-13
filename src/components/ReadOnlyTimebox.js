import React from "react";

function ReadOnlyTimebox({id, title,totalTimeInMinutes}){

    if (totalTimeInMinutes <= 0){
        throw new Error("Całkowity czas w minutach powinien być większy od zera.")
    }   
    return(
        <div className="Timebox">
                <h3> {title} - {totalTimeInMinutes} min. </h3> 
        </div>
    )
}
export default ReadOnlyTimebox;