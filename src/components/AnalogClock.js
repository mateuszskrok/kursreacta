import React from "react";

function HourHand(time){
    console.log("godzina:", time.hours)
    console.log("minuty:", time.minutes)
    console.log("sekundy:", time.seconds)
    

    const hourStyle = {
        transform: `rotate(${360*time.hours/12 + 15*time.minutes/60}deg)`
    }
    return(
        <div className="hourHand" style={hourStyle}></div>
    )
}

function MinuteHand(time){
    console.log("godzina:", time.hours)
    console.log("minuty:", time.minutes)
    console.log("sekundy:", time.seconds)


    const minuteStyle = {
        transform: `rotate(${360*(time.minutes/60 + time.seconds/3600)}deg)`
    }
    console.log(minuteStyle)
    return(
        <div className="minuteHand" style={minuteStyle}></div>
    )
}
function SecondHand(time){
    console.log("godzina:", time.hours)
    console.log("minuty:", time.minutes)
    console.log("sekundy:", time.seconds)

    const secondStyle = {
        transform: `rotate(${360*time.seconds/60}deg)`
    }
    console.log(secondStyle)
    return(
        <div className="secondHand" style={secondStyle}></div>
    )
}
function AnalogClock(time){
    const {hours,minutes,seconds} = time;
    return(
        <div className="AnalogClock">
            <HourHand hours={hours} minutes={minutes}/>
            <MinuteHand minutes={minutes} seconds={seconds}/>
            <SecondHand seconds={seconds}/>
            <div className="clockCenter"></div>
        </div> 
    )
}

export default AnalogClock;