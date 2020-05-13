import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
//import ProgressCircle from "./ProgressCircle";
import {getMinutesAndSecondsFromDurationInSeconds} from "../lib/time"

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
        this.intervalId = null
    }

    componentWillUnmount(){
        this.stopTimer();
    }
   
    startTimer(){
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(
                () =>{
                this.setState(
                    (prevState) => ({ elapsedTimeInseconds: prevState.elapsedTimeInseconds + 0.1})
                ) 
                },
                100
            )
        }
    }
    stopTimer(){
        window.clearInterval(this.intervalId);
        this.intervalId = null;
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
        const {title, totalTimeInMinutes} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes*60;
        let timeLeftInSeconds = totalTimeInSeconds

        if (elapsedTimeInseconds < totalTimeInSeconds){
            timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInseconds;
        }
        else {
            timeLeftInSeconds = 0;
            this.stopTimer();
        }
        
        const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
        const progressInPercent = 100 * elapsedTimeInseconds / totalTimeInSeconds;
        
        return (
            <React.StrictMode>
                <div className={`CurrentTimebox`}>
                    <h1>{title}</h1> 
                    <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? " inactive" : ""}/>
                    <ProgressBar 
                        percent={progressInPercent} 
                        className={isPaused ? " inactive" : ""}
                        color="green"
                        big={true}
                        />
                    <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                    <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                    <button onClick={this.togglePause} disabled={!isRunning}>{!isPaused ? "Pauza" : "Wznów"}</button>
                    <br></br>
                    Liczba przerw: {pausesCount}
                    
                </div>
            </React.StrictMode>
        
        )  
    }
  
}

export default CurrentTimebox;