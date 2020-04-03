import React from "react";

import { v4 as uuidv4 } from 'uuid';

import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import TimeboxCreator from "./TimeboxCreator";
import CurrentTimebox from "./CurrentTimebox";

class EditableTimebox extends React.Component{
    state = {
        title: "Uczę się Reacta",
        totalTimeInMinutes: 15,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({title:event.target.value});
    } 
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({onTotalTimeInMinutes:event.target.value});
    }
    handleConfirm = (event) => {
        this.setState({isEditable:false})
    }
    handleEdit = (event) => {
        this.setState({isEditable:true})
    }
    render(){
        const {title, totalTimeInMinutes, isEditable} = this.state;
        return(
            <>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    onConfirm={this.handleConfirm}
                    isEditable={isEditable}
                    />
                <CurrentTimebox 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit}
                    /> 
            </>
        )
    }
}


class TimeboxList extends React.Component{
    state = {
        timeboxes: [
            {id:uuidv4(), title:"Uczę się Reacta", totalTimeInMinutes:25},
            {id:uuidv4(), title:"Uczę się grać", totalTimeInMinutes:15},
            {id:uuidv4(), title:"Uczę się list", totalTimeInMinutes:2}
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

    updateTimebox = (idToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox) => 
            timebox.id === idToUpdate ? updatedTimebox : timebox);
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
                    onDelete={() => this.removeTimebox(timebox.id)}
                    onEdit={() =>  this.updateTimebox(timebox.id, {id: timebox.id, title:"Zmieniony timebox", totalTimeInMinutes:4})}
                />
            ))}
            
            </>
        )
    }
}


export {EditableTimebox, TimeboxList};