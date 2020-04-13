import React from "react";
import TimeboxList from "./components/TimeboxList";
import EditableTimebox from "./components/EditableTimebox";
import RealTimeClock from "./components/RealTimeClock";


function App(){
    return (
      <div className="App">
          <RealTimeClock/>
          <TimeboxList/>
          <EditableTimebox/>
      </div>
    )
}

export default App;