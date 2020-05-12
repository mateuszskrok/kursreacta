import React, {useState} from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableTimebox(){

    const [isEditable, setEditMode] = useState(false);
    const [title, setTitle] = useState("Uczę się Reacta");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(1);
    return(
        <React.StrictMode>
        <>
        {isEditable ? (
            <TimeboxEditor 
                title={title}
                totalTimeInMinutes={totalTimeInMinutes}
                onTitleChange={(event) => setTitle(event.target.value)}
                onTotalTimeInMinutesChange={(event) => setTotalTimeInMinutes(event.target.value)}
                onConfirm={() => setEditMode(false)}
                isEditable={isEditable}
            /> ): (
            <CurrentTimebox 
                title={title} 
                totalTimeInMinutes={totalTimeInMinutes}
                isEditable={isEditable}
                onEdit={() => setEditMode(true)}
                /> 
            )}
        </>
        </React.StrictMode>
        )

}

export default EditableTimebox;