import React from "react";
import classnames from "classnames";

function ProgressBar({
    className = "", 
    percent =20, 
    big=false,
    color=null}){
    
    let progressClassName = classnames(
        "progress",
        className,
        {
            "progress--big" : big,
            "progress--color-red" : color === "red"
        }
    )
    return  (
        <div className={progressClassName}>
            <div className={"progress__bar"} style={{width:`${percent}%` }}></div>
        </div>
    )
}

export default ProgressBar;