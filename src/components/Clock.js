import React from "react";


function zFill(time,n) {
    time = time.toString()
 
    while (time.length < n) {
        time = "0" + time
    }
    return time
}

function NormalizeTime(time,min,max){
    if (time < min) {
        return min
    }
    if (time > max) {
        return max
    }
    else { return time }
}

function Clock({className = "", hours = 1, minutes = 7, seconds = 99, miliseconds =4532}) {

    
    hours = NormalizeTime(hours,0,23)
    minutes = NormalizeTime(minutes,0,59)
    seconds = NormalizeTime(seconds,0,59)
    miliseconds = NormalizeTime(miliseconds,0,999)

    hours = zFill(hours,2)
    minutes =zFill(minutes,2)
    seconds =zFill(seconds,2)
    miliseconds =zFill(miliseconds,3)

    return <h2 className={"clock" + className}>Pozostało 
    <span className="clock__minutes"> {minutes}</span>
    <span className="clock__separator">:</span>
    <span className="clock__seconds">{seconds}</span>
    </h2>
}

export default Clock;