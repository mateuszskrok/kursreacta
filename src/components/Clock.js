import React from "react";
import PropTypes from "prop-types";

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

function Clock({className, hours, minutes, seconds, miliseconds}) {

    
    hours = NormalizeTime(hours,0,23)
    minutes = NormalizeTime(minutes,0,59)
    seconds = NormalizeTime(seconds,0,59)
    miliseconds = NormalizeTime(miliseconds,0,999)

    hours = zFill(hours,2)
    minutes =zFill(minutes,2)
    seconds =zFill(seconds,2)
    miliseconds =zFill(miliseconds,3)

    return <h2 className={"clock" + className}>Pozostało {minutes}:{seconds}
    </h2>
}

Clock.defaultProps = {
    className:"",
    hours: 0,
    miliseconds: 0
}
function nonNegativeNumberType(props,propName,componentName){
    if (props[propName] < 0) {
        return new Error (`Invalid prop '${propName}' issued to component '${componentName}'. It has to be positive number`)
    }
}
const numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    className: PropTypes.string,
    hours: numberOrStringType.isRequired,
    minutes: numberOrStringType.isRequired,
    seconds: nonNegativeNumberType,
    miliseconds: numberOrStringType.isRequired
}
export default Clock;