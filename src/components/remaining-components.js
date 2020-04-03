import React from "react";

import { v4 as uuidv4 } from 'uuid';
import Clock from "./Clock";

function ProgressBar({className = "", percent =20}) {
    return  <div className={"ProgressBar" + className}>
                <div style={{width:`${percent}%` }}></div>
            </div>
}

class CurrentTimebox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInseconds: 0
        }

        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }
   
    startTimer(){
        this.intervalId = window.setInterval(
            () =>{
               this.setState(
                   (prevState) => ({ elapsedTimeInseconds: prevState.elapsedTimeInseconds + 0.1})
               ) 
            },
            100
        )
    }
    stopTimer(){
        window.clearInterval(this.intervalId)
    }
    handleStart(event) {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }
    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInseconds: 0
        })
       this.stopTimer();
    }
    togglePause() {
    this.setState(
        function(prevState) {
            const isPaused = !prevState.isPaused;
            if(isPaused) {
                this.stopTimer();
            }
            else{
                this.startTimer();
            }
            return {
                isPaused,
                pausesCount: prevState.pausesCount + (!isPaused * 1)
            }
        }
        )
    }
    render() {
        const {isRunning, isPaused, pausesCount, elapsedTimeInseconds} = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes*60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInseconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = 100 * elapsedTimeInseconds / totalTimeInSeconds;
        
        return (
        <div className={`CurrentTimebox ${!isEditable ? "" : "inactive"}`}>
                <h1>{title}</h1> 
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? " inactive" : ""}/>
                <ProgressBar percent={progressInPercent} className={isPaused ? " inactive" : ""}/>                                    
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{!isPaused ? "Pauza" : "Wznów"}</button>
                <button onClick={onEdit} disabled={isEditable} >Edytuj</button>
                Liczba przerw: {pausesCount}
                
        </div>
        )  
    }
  
}

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


class TimeboxCreator extends React.Component{

    constructor(props){
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({
            id: uuidv4(), 
            title: this.titleInput.current.value, 
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
            });
            this.titleInput.current.value = "";
            this.totalTimeInMinutesInput.current.value = "";
    }
    render(){
        return (
        <form onSubmit={this.handleSubmit} className="TimeboxCreator">
            <label>Co robisz?
            <input
                ref={this.titleInput}
                type="text"
            />
            </label><br />
            <label>Ile minut? 
            <input 
                ref={this.totalTimeInMinutesInput}
                type="number"
                
            />
            </label><br />
            <button>
                    Dodaj Timebox
            </button>

        </form>
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

export {EditableTimebox, TimeboxList};