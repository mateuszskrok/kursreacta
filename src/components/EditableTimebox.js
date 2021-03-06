import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

class EditableTimebox extends React.Component{
    state = {
        title: "Uczę się Reacta",
        totalTimeInMinutes: 1,
        isEditable: false
    }
    handleTitleChange = (event) => {
        this.setState({title:event.target.value});
    } 
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes:event.target.value});
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
            <React.StrictMode>
            <>
            {isEditable ? (
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    onConfirm={this.handleConfirm}
                    isEditable={isEditable}
                /> ): (
                <CurrentTimebox 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit}
                    /> 
                )}
            </>
            </React.StrictMode>
            )
    }
}

export default EditableTimebox;