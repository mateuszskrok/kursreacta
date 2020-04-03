import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

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

export default CurrentTimebox;