import React from "react";

function TimeboxEditor(props){
    const {
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm
        } = props;
    return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
        <label>Co robisz?
        <input
            disabled={!isEditable}
            value={title}
            type="text"
            onChange={onTitleChange}
        />
        </label><br />
        <label>Ile minut? 
        <input 
        disabled={!isEditable}
            value={totalTimeInMinutes}
            type="number"
            onChange={onTotalTimeInMinutesChange}
        />
        </label><br />
        <button
            onClick={onConfirm}
            disabled={!isEditable}
            >
                Zatwierdź zmiany
        </button>
  
    </div>
    )
}

export default TimeboxEditor;