import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary"

import TimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";


class TimeboxesManager extends React.Component{
    state = {
        title: "Edytuj timebox",
        totalTimeInMinutes:10,
        timeboxes: [],
        loading: true,
        error: null,
    }

    componentDidMount(){
       TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
            (timeboxes) => this.setState({timeboxes})
        ).catch(
            (error) => this.setState({error})
        ).then(
            () => this.setState({loading: false})
        )
       
    }   
    addTimebox = (timebox) =>{
        TimeboxesAPI.addTimebox(timebox, this.context.accessToken)
            .then(
            (timeboxToAdd) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, timeboxToAdd];
                return {timeboxes};
            })  
        )
    }

    removeTimebox = (idToRemove) => {
        TimeboxesAPI.removeTimebox(idToRemove, this.context.accessToken)
        .then(
            () => { this.setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox)=>  timebox.id !== idToRemove);
                return {timeboxes};
                }
            )}
        )
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

    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(indexToUpdate, timeboxToUpdate, this.context.accessToken)
        .then(
            (updatedTimebox) => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox) => 
                timebox.id === indexToUpdate ? updatedTimebox : timebox);
                return {timeboxes};
            })
        )}   
    
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
            <ErrorBoundary message="Coś poszło nie tak">
                {this.state.loading ? "Ładuję timeboxy..." : null}
                {this.state.error ? "nie udało się załadować timeboxów" : null}
            <TimeboxesList 
                timeboxes={this.state.timeboxes}
                onTimeboxEdit={this.handleEdit}
                onTimeboxEditCancel={this.handleCancel}
                onTimeboxUpdate={this.updateTimebox}
                onTimeboxDelete={this.removeTimebox}
                onTitleChange={this.handleTitleChange}
                onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}/>
            </ErrorBoundary>
            <TimeboxCreator onCreate={this.handleCreate} />
            </>
        )
    }
}

TimeboxesManager.contextType = AuthenticationContext;

export default TimeboxesManager;