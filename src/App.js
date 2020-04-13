import React from "react";
import TimeboxList from "./components/TimeboxList";
import EditableTimebox from "./components/EditableTimebox";
//import RealTimeClock from "./components/RealTimeClock";
import Error from "./components/Error"


function App(){
    return (
      <div className="App">
          <Error message="Coś nie działa w całej aplikacji">
            <TimeboxList/>
            <EditableTimebox/>
          </Error>
      </div>
    )
}

export default App;