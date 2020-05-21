import React, { useEffect, useContext } from "react";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary"
import Timebox from "./Timebox"
import TimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import { useLegacySetState } from "./useLegacySetState";

function TimeboxesManager (){
    const initialState = {
        title: "Edytuj timebox",
        totalTimeInMinutes:10,
        timeboxes: [],
        loading: true,
        error: null,
    }

    const {accessToken} = useContext(AuthenticationContext);
    const [state, setState] = useLegacySetState(initialState)

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => setState({timeboxes})
            )
            .catch(
                (error) => setState({error})
            )
            .then(
                () => setState({loading: false}))
    },[accessToken]);
    
    
    const addTimebox = (timebox) =>{
        TimeboxesAPI.addTimebox(timebox, accessToken)
            .then(
            (timeboxToAdd) => setState(prevState => {
                const timeboxes = [...prevState.timeboxes, timeboxToAdd];
                return {timeboxes};
            })  
        )
    }

    const removeTimebox = (idToRemove) => {
        TimeboxesAPI.removeTimebox(idToRemove, accessToken)
        .then(
            () => { setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox)=>  timebox.id !== idToRemove);
                return {timeboxes};
                }
            )}
        )
    } 
    const handleEdit = (idToEdit, editableTimebox) => {
        setState(prevState => {
            const title = editableTimebox.title;
            const totalTimeInMinutes = editableTimebox.totalTimeInMinutes;
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToEdit ? editableTimebox : timebox);
            return {timeboxes, title, totalTimeInMinutes};
        })
    }
    
    const handleTitleChange = (event) => {
        setState({title:event.target.value});
    } 
    const handleTotalTimeInMinutesChange = (event) => {
        setState({totalTimeInMinutes:event.target.value});
    }

    const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(indexToUpdate, timeboxToUpdate, accessToken)
        .then(
            (updatedTimebox) => setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox) => 
                timebox.id === indexToUpdate ? updatedTimebox : timebox);
                return {timeboxes};
            })
        )}   
    
    const handleCancel = (idToEdit, nonEditableTimebox) => {
        setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToEdit ? nonEditableTimebox : timebox);
            return {timeboxes};
        })
    }
    const handleCreate = (createdTimebox) => {
        addTimebox(createdTimebox);
    }
    const renderTimebox = (timebox) => {
        return(<Timebox 
            key={timebox.id} 
            title={timebox.title} 
            totalTimeInMinutes={timebox.totalTimeInMinutes} 
            isEditable={timebox.isEditable} 
            onTitleChange={handleTitleChange} 
            onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange} 
            onDelete={() => removeTimebox(timebox.id)} 
            onEdit={() => handleEdit(timebox.id, {
                id: timebox.id,
                title: timebox.title,
                totalTimeInMinutes: timebox.totalTimeInMinutes,
                isEditable: true
            })} 
            onSave={() => updateTimebox(timebox.id, {
                id: timebox.id,
                title: state.title,
                totalTimeInMinutes: state.totalTimeInMinutes
            })} 
            onCancel={() => handleCancel(timebox.id, {
                id: timebox.id,
                title: timebox.title,
                totalTimeInMinutes: timebox.totalTimeInMinutes,
                isEditable: false
            })} 
            />)
    }

    const renderReadOnlyTimebox = (timebox) => {
        return(
            <ReadOnlyTimebox 
                key={timebox.id} 
                title={timebox.title} 
                totalTimeInMinutes={timebox.totalTimeInMinutes} 
            />
        )
    }
        
    return(
        <>
        <ErrorBoundary message="Coś poszło nie tak">
            {state.loading ? "Ładuję timeboxy..." : null}
            {state.error ? "nie udało się załadować timeboxów" : null}
        <TimeboxesList 
            timeboxes={state.timeboxes}
            renderTimebox={renderTimebox}
        />
        </ErrorBoundary>
        <TimeboxCreator onCreate={handleCreate} />
        </>
    )
}



export default TimeboxesManager;