import React from "react";
import TimeboxList from "./components/TimeboxList";
import EditableTimebox from "./components/EditableTimebox";
//import RealTimeClock from "./components/RealTimeClock";
import ErrorBoundary from "./components/ErrorBoundary"


function App(){
    return (
      <div className="App">
          <ErrorBoundary message="Coś nie działa w całej aplikacji">
            <TimeboxList/>
            <EditableTimebox/>
          </ErrorBoundary>
      </div>
    )
}

export default App;