import React from "react";

function Timebox({id, title,totalTimeInMinutes, isEditable, onTitleChange,
    onTotalTimeInMinutesChange, onDelete, onEdit, onSave, onCancel}){
    return(
        <div className="Timebox">
             {!isEditable ? 
                <h3> {title} - {totalTimeInMinutes} min. </h3> :
                <>
                <input type="text" 
                    defaultValue={title}
                    onChange={onTitleChange}>
                </input>
                <input 
                    type="number" 
                    defaultValue={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                ></input>min.
                </>
            }
            <button onClick={!isEditable ? onDelete : onCancel}> 
                {!isEditable ? "Usuń" : "Anuluj"}  
            </button>
            <button onClick={!isEditable ? onEdit : onSave}> 
                {!isEditable ? "Edytuj" : "Zapisz"} 
            </button>
           
        </div>
    )
}
export default Timebox;