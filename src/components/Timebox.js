import React from "react";

function Timebox({id, title,totalTimeInMinutes, onDelete, onEdit}){
    return(
        <div className="Timebox">
            <h3> {title} - {totalTimeInMinutes} min. </h3>
            <button onClick={onDelete}> Usuń </button>
            <button onClick={onEdit}> Zmień </button>
            <input />
        </div>
    )
}
export default Timebox;