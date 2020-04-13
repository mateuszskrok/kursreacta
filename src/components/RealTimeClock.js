import React from "react";
import AnalogClock from "./AnalogClock";

function zFill(time,n) {
    time = time.toString()
 
    while (time.length < n) {
        time = "0" + time
    }
    return time
}

class RealTimeClock extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            today: new Date()
        }
    }
    componentDidMount(){
        this.intervalID = window.setInterval(
            () => {
                this.setState(
                    () => ({ today: new Date()})
                ) 
                //console.log("date updated");
            },
            1000
        )
    }
    componentWillUnmount(){
        window.clearInterval(this.intervalID)
    }
    render(){

    var hours = this.state.today.getHours();
    var minutes = this.state.today.getMinutes();
    var seconds = this.state.today.getSeconds();

    hours = zFill(hours,2)
    minutes =zFill(minutes,2)
    seconds =zFill(seconds,2)

    return (
        <>
        <h2 className={"Clock"}>
            Jest godzina {hours}:{minutes}:{seconds}
        </h2>
        <AnalogClock hours={parseInt(hours)} minutes={parseInt(minutes)} seconds={parseInt(seconds)}/>
        </>
    )
    }
}

export default RealTimeClock;