import React from "react";

import { v4 as uuidv4 } from 'uuid';

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxEditor from "./TimeboxEditor";

class TimeboxList extends React.Component{
    state = {
        title: "Edytuj timebox",
        totalTimeInMinutes:10,

        timeboxes: [
            {id:uuidv4(), title:"Uczę się Reacta", totalTimeInMinutes:25, isEditable:false},
            {id:uuidv4(), title:"Uczę się grać", totalTimeInMinutes:15, isEditable:false},
            {id:uuidv4(), title:"Uczę się list", totalTimeInMinutes:2, isEditable:false}
               ]
    }
    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {timeboxes};
        })
    }  

    removeTimebox = (idToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox)=>  timebox.id !== idToRemove);
            return {timeboxes};
        })
    } 
    handleEdit = (idToEdit, editableTimebox) => {
        this.setState(prevState => {
            const title = editableTimebox.title;
            const totalTimeInMinutes = editableTimebox.totalTimeInMinutes;
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToEdit ? editableTimebox : timebox);
            return {timeboxes, title, totalTimeInMinutes};
        })
    }
    
    handleTitleChange = (event) => {
        this.setState({title:event.target.value});
    } 
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes:event.target.value});
    }

    updateTimebox = (idToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToUpdate ? updatedTimebox : timebox);
            return {timeboxes};
        })
    }   
    
    handleCancel = (idToEdit, nonEditableTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToEdit ? nonEditableTimebox : timebox);
            return {timeboxes};
        })
    }
    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }
    render(){
        
        return(
            <>
            <TimeboxCreator onCreate={this.handleCreate} />
            {this.state.timeboxes.map((timebox)=> (
                <Timebox 
                    key={timebox.id} 
                    title={timebox.title} 
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    isEditable={timebox.isEditable}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    onDelete={() => this.removeTimebox(timebox.id)}
                    onEdit={() => this.handleEdit(timebox.id,
                        {
                            id: timebox.id, 
                            title: timebox.title,
                            totalTimeInMinutes: timebox.totalTimeInMinutes,
                            isEditable: true
                        })}
                    onSave={() =>  this.updateTimebox(timebox.id, 
                        {
                            id: timebox.id, 
                            title: this.state.title,
                            totalTimeInMinutes:this.state.totalTimeInMinutes
                        })}
                    onCancel={ () => this.handleCancel(timebox.id,
                        {
                            id: timebox.id, 
                            title: timebox.title,
                            totalTimeInMinutes:timebox.totalTimeInMinutes,
                            isEditable: false
                        })}
                />
            ))}
            
            </>
        )
    }
}


export default TimeboxList;